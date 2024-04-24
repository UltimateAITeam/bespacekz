"use server";
import postmark from "@/libs/postmark";
import { prisma } from "@/libs/prisma";
import { add } from "date-fns";
import { render } from "@react-email/components";
import PasswordRecovery from "@/emails/password-recovery";

function randomString(size: number) {
  const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2);
  const r = (a: string, i: number): string => a + i2hex(i);
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  return Array.from(bytes).reduce(r, "");
}

export async function sendPasswordRecoveryEmail({ email }: { email: string }) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return;
  }

  const token = randomString(32);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: token,
      expires: add(new Date(), { days: 1 }),
    },
  });

  const html = render(<PasswordRecovery token={token} />);

  if (process.env.NODE_ENV === "production") {
    await postmark.sendEmail({
      From: "info@bespace.kz",
      To: email,
      Subject: "Восстановите ваш пароль",
      HtmlBody: html,
      MessageStream: "outbound",
    });
  } else {
    console.log(token);
  }
}
