import { prisma } from "@/libs/prisma";
import { randomInt } from "node:crypto";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/libs/auth";
import {
  SUBSCRIPTION_PLANS,
  isSubscriptionPlanId,
} from "@/libs/subscription-plans";

function randomId() {
  return Array.from({ length: 15 }, () => randomInt(9)).join("");
}

type Token = {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  token_type: string;
};

type Invoice = {
  id: string;
  shop_id: string;
  amount: number;
  invoice_id: string;
  language: string;
  currency: string;
  description: string;
  account_id: string;
  recipient_contact: string;
  recipient_contact_sms: string;
  notifier_contact: string;
  notifier_contact_sms: string;
  expire_period: string;
  post_link: string;
  failure_post_link: string;
  back_link: string;
  failure_back_link: string;
  created_date: Date;
  expire_date: Date;
  status: string;
  updated_date: Date;
  invoice_url: string;
  merchant_id: string;
  terminal_id: string;
  card_save: boolean;
};

async function createToken(): Promise<Token> {
  const payload = new FormData();
  payload.append("grant_type", "client_credentials");
  payload.append("scope", "payment");
  payload.append("client_id", process.env.EPAY_CLIENT_ID);
  payload.append("client_secret", process.env.EPAY_CLIENT_SECRET);

  const response = await fetch(
    "https://testoauth.homebank.kz/epay2/oauth2/token",
    {
      method: "POST",
      body: payload,
    },
  );

  return response.json();
}

async function createInvoice(args: {
  amount: number;
  account_id: string;
  recipient_contact: string;
}): Promise<Invoice> {
  const token = await createToken();

  const payload = {
    shop_id: process.env.EPAY_SHOP_ID,
    account_id: args.account_id,
    invoice_id: randomId(),
    amount: args.amount,
    language: "rus",
    description: "",
    expire_period: "1d",
    recipient_contact: args.recipient_contact,
    post_link: `${process.env.API_URL}/api/subscription/callback`,
    back_link: `${process.env.API_URL}`,
    currency: "KZT",
  };

  await prisma.invoice.create({
    data: {
      metadata: {
        epay: payload,
      },
    },
  });

  const response = await fetch("https://testepay.homebank.kz/api/invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access_token}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const plan = req.nextUrl.searchParams.get("plan");

  // Contact fallback keeps the selected plan so users can still reach out
  // whenever the automated payment flow is unavailable.
  const contactUrl = new URL("/purchase/resume-access", origin);
  if (isSubscriptionPlanId(plan)) {
    contactUrl.searchParams.set("plan", plan);
  }

  if (!isSubscriptionPlanId(plan)) {
    return NextResponse.redirect(contactUrl);
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("callbackUrl", `/api/subscription/new?plan=${plan}`);
    return NextResponse.redirect(loginUrl);
  }

  const client = await prisma.clientProfile.findUnique({
    where: {
      userEmail: session.user.email,
    },
    select: {
      id: true,
    },
  });

  // Resume-database access is a client-only product; route everyone else to
  // the contact page rather than a dead end.
  if (!client) {
    return NextResponse.redirect(contactUrl);
  }

  try {
    const invoice = await createInvoice({
      amount: SUBSCRIPTION_PLANS[plan].amount,
      account_id: client.id,
      recipient_contact: session.user.email,
    });

    if (!invoice?.invoice_url) {
      throw new Error("ePay response did not contain an invoice_url");
    }

    return NextResponse.redirect(invoice.invoice_url);
  } catch (error) {
    console.error("Failed to create ePay invoice", error);
    contactUrl.searchParams.set("reason", "payment");
    return NextResponse.redirect(contactUrl);
  }
}
