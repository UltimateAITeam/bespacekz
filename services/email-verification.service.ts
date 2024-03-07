import 'server-only'
import mailer from "@/libs/mailer";
import { prisma } from "@/libs/prisma";
import { add } from 'date-fns'
import { hash } from 'bcrypt';

export function randomString(size: number) {
    const i2hex = (i: number) => ("0" + i.toString(16)).slice(-2)
    const r = (a: string, i: number): string => a + i2hex(i)
    const bytes = crypto.getRandomValues(new Uint8Array(size))
    return Array.from(bytes).reduce(r, "")
  }
  

export async function sendVerificationEmail({ email }: { email: string }) {
    const token =randomString(32)

    await prisma.verificationToken.create({
        data: {
            identifier: email,
            token: token,
            expires: add(new Date(), { days: 7 })
        }
    })

    await mailer.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject:'Подтвердите ваш email',
        html: `<a href="http://localhost:3000/api/verify_email?token=${token}">Перейдите по ссылке чтобы подтвердить ваш email</a>`
    })
}