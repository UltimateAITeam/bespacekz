"use client";
import { FormEvent, Fragment, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleButton from "@/components/GoogleButton";
import GitHubButton from "@/components/GitHubButton";
import { RiLockPasswordFill } from "react-icons/ri";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import { BsFillPersonFill } from "react-icons/bs";
import LoginSignupFooter from "@/components/brenda_components/LoginSignupFooter";
import HeadTag from "@/components/brenda_components/HeadTag";
import LinkedInButton from "@/components/LinkedInButton";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [emailRequired, setEmailRequired] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const router = useRouter();

  const signMeIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
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
    if (!password) {
      setPasswordRequired(true);
      return;
    } else {
      setPasswordRequired(false);
    }

    signIn("credentials", {
      role: "login",
      password: password,
      email: email,
    }).then((e) => {
      e?.ok ? router.push("/firststeps") : setInvalidCredentials(true);
    });
  };

  return (
    <Fragment>
      <div className="flex min-h-screen flex-col bg-white">
        {/* ============== Head Tag =============== */}
        <HeadTag title="Log In - Bespace" />

        {/* ================== Header =================== */}
        <LoginSignupHeader />

        {/* ================= Main ==================== */}
        <main>
          <section className="container mx-auto my-5 px-3 py-3 sm:flex sm:justify-center sm:px-7 md:my-7 md:px-5 lg:my-10 xl:my-14">
            <div className="rounded-xl border-gray-300 sm:border">
              <div className="flex flex-col items-center justify-center pb-7 sm:px-24 sm:pt-7">
                {/* ================= Login title ==================== */}
                <h2 className="text-2xl font-semibold text-zinc-800 md:text-3xl">
                  Войти
                </h2>
                <div
                  className={
                    invalidCredentials
                      ? "mt-4 rounded bg-red-500 px-6 py-2"
                      : "hidden"
                  }
                >
                  Invalid credentials!
                </div>

                {/* ================= Login Email Form ==================== */}
                <form
                  className="mt-4 w-full space-y-4 sm:w-auto"
                  onSubmit={signMeIn}
                >
                  <label
                    className={
                      emailRequired
                        ? "block text-red-600"
                        : "hidden text-red-600"
                    }
                  >
                    Email required
                  </label>
                  <div className="flex flex-grow items-center rounded-lg border-2 border-gray-300 px-3 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2 sm:w-[25rem] xl:px-6">
                    <BsFillPersonFill className="cursor-pointer text-lg text-zinc-700 hover:text-zinc-500" />
                    <input
                      type="text"
                      name="email"
                      className={`${emailRequired ? "border-red-500" : ""} mx-3 w-40 flex-grow appearance-none border-0 bg-transparent text-zinc-700 focus:text-zinc-600 focus:outline-none focus:ring-0 xl:w-full`}
                      placeholder="Email"
                    />
                  </div>
                  <label
                    className={
                      passwordRequired
                        ? "block text-red-600"
                        : "hidden text-red-600"
                    }
                  >
                    Password required
                  </label>
                  <div className="flex flex-grow items-center rounded-lg border-2 border-gray-300 px-3 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2 sm:w-[25rem] xl:px-6">
                    <RiLockPasswordFill className="cursor-pointer text-lg text-zinc-700 hover:text-zinc-500" />
                    <input
                      type="password"
                      name="password"
                      className={`${passwordRequired ? "border-red-500" : ""} mx-3 w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full`}
                      placeholder="Password"
                    />
                  </div>
                  <button
                    className="w-full rounded-lg bg-[#0C4A6E] px-3 py-3 font-semibold text-white transition hover:bg-[#18465f]"
                    type="submit"
                  >
                    Войти
                  </button>
                </form>

                {/* ================= Or section ==================== */}
                <div className="mt-5 flex w-full items-center space-x-2">
                  <span className="mt-1 w-full border-b border-gray-300"></span>
                  <span className="text-zinc-600">или</span>
                  <span className="mt-1 w-full border-b border-gray-300"></span>
                </div>

                {/* ================= Continue with section ==================== */}
                <div className="flex w-full flex-row items-center gap-6 pt-8">
                  <GoogleButton
                    options={{ redirect: true, callbackUrl: "/moreinfo" }}
                    text={"Continue with Google"}
                    className={""}
                  />
                  <GitHubButton
                    options={{ redirect: true, callbackUrl: "/moreinfo" }}
                    text={"Continue with GitHub"}
                    className={""}
                  />
                  <LinkedInButton
                    options={{ redirect: true, callbackUrl: "/moreinfo" }}
                    text={"Continue with LinkedIn"}
                    className={""}
                  />
                </div>
              </div>

              {/* ================= Don't have account section ================= */}
              <div className="mt-7 flex flex-col items-center justify-center border-t border-gray-300 py-7 lg:px-24">
                {/* ================= Or section ==================== */}
                <div className="flex w-full items-center justify-center">
                  <span className="text-zinc-600">
                    {" "}
                    Не зарегистрированы в Bespace?{" "}
                  </span>
                </div>
                {/* ============== */}
                <div className="w-full sm:w-auto">
                  <Link
                    href={"/signup"}
                    className="mt-5 flex w-full items-center justify-center rounded-lg border border-[#0C4A6E] px-3 py-2 font-semibold text-[#0C4A6E] transition hover:border-[#0C4A6E] hover:text-[#0C4A6E] sm:px-20"
                  >
                    Присоединиться
                  </Link>
                  {/*  */}
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
