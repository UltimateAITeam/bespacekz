"use client";

import React, { useState } from "react";
import HeadTag from "@/components/brenda_components/HeadTag";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import Link from "next/link";
import LoginSignupFooter from "@/components/brenda_components/LoginSignupFooter";
import { FcReadingEbook, FcConferenceCall } from "react-icons/fc";
import GitHubButton from "@/components/GitHubButton";
import GoogleButton from "@/components/GoogleButton";
import SignupForm from "@/components/signup_elements/SignupForm";

function SignUp() {
  // ==================== Hooks Call ===========================
  const [client, setClient] = useState(false);
  const [freelancer, setFreelancer] = useState(false);
  const [btnText, setBtnText] = useState("Create Account");
  const [clientForm, setClientForm] = useState(false);
  const [freelancerForm, setFreelancerForm] = useState(false);

  // ================= Handle Function =========================
  const handleClient = () => {
    setClient(true);
    if (freelancer) setFreelancer(false);
    setBtnText("Join as a Client");
  };

  const handleFreelancer = () => {
    setFreelancer(true);
    if (client) setClient(false);
    setBtnText("Apply as a Freelancer");
  };

  const handleForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add form handling logic here
  };

  const handleConditionForm = (type?: string) => {
    if (type === "client" || client) {
      localStorage.setItem("userRole", "CLIENT");
      setClientForm(true);
      if (freelancerForm) setFreelancerForm(false);
    } else if (type === "freelancer" || freelancer) {
      localStorage.setItem("userRole", "FREELANCER");
      setFreelancerForm(true);
      if (clientForm) setClientForm(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ============== Head Tag =============== */}
      <HeadTag title="Create an Account - Bespace" />

      {/* ================== Header =================== */}
      <LoginSignupHeader />

      {/* ================= Main ==================== */}
      <main>
        {/* ================= Condition Section =================== */}
        {clientForm == true || freelancerForm == true ? null : (
          <section className="container mx-auto my-5 px-3 py-3 sm:px-7 md:my-7 md:flex md:justify-center md:px-5 lg:my-10 xl:my-14">
            <div className="rounded-xl border-gray-300 sm:border">
              <div className="flex flex-col justify-center pb-10 sm:px-10 sm:pt-10 md:items-center md:px-20 lg:px-24">
                {/* ================= Login title ==================== */}
                <h2 className="text-center text-2xl font-semibold text-zinc-800 md:text-3xl">
                  Join as a client or freelancer
                  {/* Регистрация  */}
                </h2>

                {/* ===================== Create account section ========================== */}
                <div className="mt-10 flex flex-col items-center space-y-5 md:flex-row md:space-x-8 md:space-y-0">
                  {/* ========== client =========== */}
                  <div
                    className={`${client ? "bg-[#0C4A6E]" : "bg-[#e5ecea] hover:bg-[#d1dfdb]"} flex w-full cursor-pointer flex-col items-center space-y-4 rounded-xl px-5 py-7 transition sm:px-8 md:w-auto md:max-w-[17rem]`}
                    onClick={handleClient}
                  >
                    <div>
                      <FcConferenceCall className="text-5xl" />
                    </div>
                    <div>
                      <h4
                        className={`${client == true ? "text-[#e5ecea]" : "text-zinc-800"} text-center text-lg font-semibold`}
                      >
                        I’m a client, hiring for a project
                      </h4>
                    </div>
                  </div>

                  {/* ========== client =========== */}
                  <div
                    className={`${freelancer == true ? "bg-[#0C4A6E]" : "bg-[#e5ecea] hover:bg-[#d1dfdb]"} flex w-full cursor-pointer flex-col items-center space-y-4 rounded-xl px-5 py-7 transition sm:px-8 md:w-auto md:max-w-[17rem]`}
                    onClick={handleFreelancer}
                  >
                    <div>
                      <FcReadingEbook className="text-5xl" />
                    </div>
                    <div>
                      <h4
                        className={`${freelancer == true ? "text-[#e5ecea]" : "text-zinc-800"} text-center text-lg font-semibold`}
                      >
                        I’m a freelancer, looking for work
                      </h4>
                    </div>
                  </div>
                </div>

                {/* =============== Button =================== */}
                <button
                  className={`${freelancer == true || client == true ? "bg-[#0C4A6E] text-white hover:bg-[#18465f]" : "bg-[#e5ecea] text-gray-500 hover:bg-[#d1dfdb]"} mt-10 w-full rounded-full px-3 py-2 font-semibold transition md:w-auto md:px-20`}
                  onClick={() => handleConditionForm()}
                >
                  {btnText}
                </button>

                {/* ================ alread have account section ================== */}
                <div className="mt-7">
                  <p className="text-center text-zinc-800">
                    Already have an account?
                    <Link href="/login">
                      <span className="font-semibold text-blue-700 hover:underline">
                        {" "}
                        Log In{" "}
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================== Client Form ====================== */}
        {clientForm && <SignupForm type={"client"} />}

        {/* ======================== Freelancer Form ====================== */}
        {freelancerForm && <SignupForm type={"freelancer"} />}
      </main>

      {/* ==================== Footer ====================== */}
      <LoginSignupFooter />
    </div>
  );
}

export default SignUp;
