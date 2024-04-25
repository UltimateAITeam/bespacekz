"use client";
import HeadTag from "@/components/brenda_components/HeadTag";
import LoginSignupFooter from "@/components/brenda_components/LoginSignupFooter";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Fragment, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { updatePassword } from "./actions";
import { useToast } from "@chakra-ui/react";

export default function LoginPage({ params }: { params: { token: string } }) {
  const [passwordRequired, setPasswordRequired] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();
  const toast = useToast();

  const signMeIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password")?.toString();

    if (!password) {
      setPasswordRequired(true);
      return;
    } else {
      setPasswordRequired(false);
    }

    try {
      await updatePassword(params.token, password);
      toast({
        title: "Пароль обновлен",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/login");
    } catch (error) {
      toast({
        title: "Что-то пошло не так",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
                  Обновите пароль
                </h2>
                {/* ================= Login Email Form ==================== */}
                <form
                  className="mt-4 space-y-4 sm:w-auto w-full"
                  onSubmit={signMeIn}
                >
                  <label
                    className={
                      passwordRequired
                        ? "text-red-600 block"
                        : "text-red-600 hidden"
                    }
                  >
                    Password required
                  </label>
                  <div className="flex flex-grow border-2 border-gray-300 transition rounded-lg sm:w-[25rem] items-center xl:px-6 px-3 py-1.5 hover:bg-[#F3FFFC] hover:ring-2 ring-[#729bb3]">
                    <RiLockPasswordFill className="text-lg text-zinc-700 cursor-pointer hover:text-zinc-500" />
                    <input
                      type="password"
                      name="password"
                      className={`${passwordRequired ? "border-red-500" : ""} flex-grow xl:w-full border-0 w-40 focus:ring-0 focus:outline-none bg-transparent mx-3 text-zinc-700`}
                      placeholder="Password"
                    />
                  </div>
                  <button
                    className="w-full py-3 px-3 bg-[#0C4A6E] rounded-lg font-semibold text-white transition hover:bg-[#18465f]"
                    type="submit"
                  >
                    Обновить
                  </button>
                </form>
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
