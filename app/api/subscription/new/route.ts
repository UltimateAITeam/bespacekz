import { prisma } from "@/libs/prisma";
import { randomInt } from "node:crypto";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

  const payload = JSON.stringify({
    shop_id: process.env.EPAY_SHOP_ID,
    account_id: args.account_id,
    invoice_id: randomId(),
    amount: args.amount,
    language: "rus",
    description: "",
    expire_period: "1d",
    recipient_contact: args.recipient_contact,
    post_link:
      "https://1aef-104-28-241-137.ngrok-free.app/api/subscription/callback",
    currency: "KZT",
  });

  const response = await fetch("https://testepay.homebank.kz/api/invoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access_token}`,
    },
    body: payload,
  });

  return response.json();
}

const planAmount: Record<string, number> = {
  starter: 79,
  growth: 149,
  scale: 349,
};

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.redirect("/login");
  }

  const client = await prisma.clientProfile.findUnique({
    where: {
      userEmail: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!client) {
    return NextResponse.redirect("/login");
  }

  const plan = req.nextUrl.searchParams.get("plan");

  if (!plan) {
    return NextResponse.error();
  }

  if (!(plan in planAmount)) {
    return NextResponse.error();
  }

  const invoice = await createInvoice({
    amount: planAmount[plan],
    account_id: client.id,
    recipient_contact: session.user.email,
  });

  return NextResponse.redirect(invoice.invoice_url);
}
