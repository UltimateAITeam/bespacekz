"use client";
import HeadTag from "@/components/brenda_components/HeadTag";
import LoginSignupFooter from "@/components/brenda_components/LoginSignupFooter";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import { useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Fragment, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { sendPasswordRecoveryEmail } from "./actions";

export default function LoginPage() {
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const toast = useToast();
  const error = searchParams.get("error");

  const recoverPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    if (
      !email ||
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setEmailRequired(true);
      return;
    } else {
      setEmailRequired(false);
    }

    await sendPasswordRecoveryEmail({ email });

    toast({
      title: "Ссылка отправлена",
      description: "На вашу почту придет ссылка на восстановление пароля.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-white flex flex-col">
        {/* ============== Head Tag =============== */}
        <HeadTag title="Log In - Bespace" />

        {/* ================== Header =================== */}
        <LoginSignupHeader />

        {/* ================= Main ==================== */}
        <main>
          <section className="container mx-auto xl:my-14 lg:my-10 md:my-7 my-5 py-3 md:px-5 sm:px-7 px-3 sm:flex sm:justify-center">
            <div className="sm:border border-gray-300 rounded-xl">
              <div className="sm:px-24 sm:pt-7 pb-7 flex flex-col justify-center items-center">
                {/* ================= Login title ==================== */}
                <h2 className="font-semibold text-zinc-800 md:text-3xl text-2xl">
                  Восстановить пароль
                </h2>
                <div
                  className={
                    error === "CredentialsSignin"
                      ? "bg-red-500 py-2 px-6 rounded mt-4"
                      : "hidden"
                  }
                >
                  Invalid credentials!
                </div>

                {/* ================= Login Email Form ==================== */}
                <form
                  className="mt-4 space-y-4 sm:w-auto w-full"
                  onSubmit={recoverPassword}
                >
                  <label
                    className={
                      emailRequired
                        ? "text-red-600 block"
                        : "text-red-600 hidden"
                    }
                  >
                    Email required
                  </label>
                  <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg sm:w-[25rem] items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3]">
                    <BsFillPersonFill className="text-lg text-zinc-700 cursor-pointer hover:text-zinc-500" />
                    <input
                      type="text"
                      name="email"
                      className={`${emailRequired ? "border-red-500" : ""} flex-grow appearance-none focus:text-zinc-600 xl:w-full border-0 w-40 focus:ring-0 focus:outline-none bg-transparent mx-3 text-zinc-700`}
                      placeholder="Email"
                    />
                  </div>
                  <button
                    className="w-full py-3 px-3 bg-[#0C4A6E] rounded-lg font-semibold text-white transition hover:bg-[#18465f]"
                    type="submit"
                  >
                    Отправить ссылку
                  </button>
                </form>
              </div>

              {/* ================= Don't have account section ================= */}
              <div className="lg:px-24 py-7 flex flex-col justify-center items-center border-t border-gray-300 mt-7">
                {/* ================= Or section ==================== */}
                <div className="flex w-full justify-center items-center">
                  <Link href="/login" className="text-zinc-600">
                    Вернуться ко входу
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ==================== Footer ====================== */}
        <LoginSignupFooter />
      </div>
    </Fragment>
  );
}
