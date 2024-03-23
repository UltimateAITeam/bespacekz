"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

function FirstStepsForms() {
  const session = useSession();

  let role: Role | null | undefined = session.data?.user.role;
  if (!role && typeof window !== "undefined") {
    role = localStorage.getItem("userRole") as Role;
  }

  if (role === Role.FREELANCER)
    return (
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        className={"flex flex-col justify-between md:flex-row"}
      >
        <div className={"m-auto mt-0 flex flex-col sm:ml-52 sm:mt-36"}>
          <span
            className={
              "font-zinc-950 text-4xl font-semibold lg:text-5xl 2xl:font-bold"
            }
          >
            Расскажите нам <br /> о себе больше!
          </span>
          <span className={"mt-4 text-xl"}>
            Заполните краткую анкету для вашего профиля
          </span>
        </div>
        <div className={"sm:mr-56 sm:mt-20 sm:hidden xl:block"}>
          <Image
            src={"/bespace/tell-us.jpeg"}
            width={400}
            height={400}
            alt={"logo url"}
          />
        </div>
      </motion.div>
    );
  else redirect("/");
}

export default FirstStepsForms;
