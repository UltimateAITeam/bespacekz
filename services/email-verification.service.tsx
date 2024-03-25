import "server-only";
import postmark from "@/libs/postmark";
import { prisma } from "@/libs/prisma";
import { add } from "date-fns";
import { render } from "@react-email/components";
import VerifyEmail from "@/emails/verify-email";

export function randomString(size: number) {
  const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2);
  const r = (a: string, i: number): string => a + i2hex(i);
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r, "");
}

export async function sendVerificationEmail({ email }: { email: string }) {
  const token = randomString(32);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: token,
      expires: add(new Date(), { days: 7 }),
    },
  });

  const html = render(<VerifyEmail token={token} />);

  await postmark.sendEmail({
    From: "info@bespace.kz",
    To: email,
    Subject: "Подтвердите ваш email",
    HtmlBody: html,
    MessageStream: "outbound",
  });
}
