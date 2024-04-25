"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import { redirect, usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import HeadTag from "@/components/brenda_components/HeadTag";
import LoginSignupHeader from "@/components/brenda_components/LoginSignupHeader";
import useEducationFormStore from "@/store/educationFormStore";
import useExperienceStore from "@/store/experienceFormState";
import usePricingStore from "@/store/pricingFormStore";
import { useFirstStepsLoading } from "@/libs/hooks";
import useTitleStore from "@/store/titleFormStateStore";
import useLanguagesStore from "@/store/languagesFormStore";
import useAboutStore from "@/store/aboutFormStore";
import useSkillsStore from "@/store/skillFormStore";

// CHECK THIS PAGE
function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = useSession();
  const pages = [
    {
      path: "/firststeps",
      back: "",
      skip: false,
      next: "Следующий шаг",
    },
    {
      path: "/firststeps/title",
      back: "Назад",
      skip: false,
      next: "Следующий шаг",
    },
    {
      path: "/firststeps/skills",
      back: "Назад",
      skip: true,
      next: "Следующий шаг",
    },
    {
      path: "/firststeps/education",
      back: "Назад",
      skip: true,
      next: "Следующий шаг",
    },
    {
      path: "/firststeps/experience",
      back: "Назад",
      skip: true,
      next: "Следующий шаг",
    },
    {
      path: "/firststeps/languages",
      back: "Назад",
      skip: true,
      next: "Следующий шаг",
    },
    {
      path: "/firststeps/price",
      back: "Назад",
      skip: true,
      next: "Следующий шаг",
    },
    {
      path: "/firststeps/about",
      back: "Назад",
      skip: false,
      next: "Следующий шаг",
    },
  ];
  const pathName = usePathname();
  const pageIndex = pages.findIndex((value) => {
    return value.path === pathName;
  });
  const { educations } = useEducationFormStore();
  const { experience } = useExperienceStore();
  const { languages } = useLanguagesStore();
  const { projectRate, hourlyRate, employeeRate, pricingType } =
    usePricingStore();
  const { title } = useTitleStore();
  const { about } = useAboutStore();
  const { skills } = useSkillsStore();

  // Check if all fields are filled
  const isFilledEdu =
    educations.length >= 1 &&
    educations.every((item) => {
      return (
        item.institution.length >= 2 &&
        item.specialization.length > 2 &&
        item.degree !== ""
      );
    });
  const isFilledExp =
    experience.length >= 1 &&
    experience.every((item) => {
      return (
        item.company !== "" &&
        item.name.length > 1 &&
        item.skills.length !== 0 &&
        item.tasks.length > 5 &&
        item.company.length > 4
      );
    });
  const isFilledLanguages =
    languages.length >= 1 &&
    languages.every((item) => {
      return item.name.length > 3;
    });

  const isFilledSkills =
    skills.length >= 1 &&
    skills.every((item) => {
      return item.name !== "" && item.proficiencyLevel !== "";
    });

  const postData = async (url: string, data: any) => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((value) => {
        if (value.ok) Promise.resolve("success");
        else Promise.reject(value.status);
      })
      .catch((reason) => {
        Promise.reject(reason);
      });
  };

  const couldNext = () => {
    switch (pages[pageIndex].path) {
      case "/firststeps/education":
        return isFilledEdu;
      case "/firststeps/title":
        return title.length > 5;
      case "/firststeps/skills":
        return isFilledSkills;
      case "/firststeps":
        return true;
      case "/firststeps/experience":
        return isFilledExp;
      case "/firststeps/languages":
        return isFilledLanguages;
      case "/firststeps/price":
        return (
          pricingType.length > 0 &&
          (pricingType.includes("FREELANCE")
            ? projectRate > 0 && hourlyRate > 0
            : true) &&
          (pricingType.includes("EMPLOYEE") ? employeeRate > 0 : true)
        );
      case "/firststeps/about":
        return about.length > 10;
    }
  };

  const handleNext = () => {
    switch (pages[pageIndex].path) {
      case "/firststeps/education":
        postData("/api/profile/education", educations)
          .then((value) => {
            router.push(pages[pageIndex + 1].path);
          })
          .catch((reason) => {});
        break;
      case "/firststeps":
        router.push(pages[pageIndex + 1].path);
        break;
      case "/firststeps/title":
        postData("/api/profile/title", { title: title })
          .then((value) => {
            router.push(pages[pageIndex + 1].path);
          })
          .catch((reason) => {});
        break;

      case "/firststeps/skills":
        postData("/api/profile/skills", skills)
          .then((value) => {
            router.push(pages[pageIndex + 1].path);
          })
          .catch((reason) => {
            console.log(reason);
          });
        break;
      case "/firststeps/experience":
        postData("/api/profile/experience", experience)
          .then((value) => {
            router.push(pages[pageIndex + 1].path);
          })
          .catch((reason) => {});
        break;
      case "/firststeps/languages":
        postData("/api/profile/languages", languages)
          .then((value) => {
            router.push(pages[pageIndex + 1].path);
          })
          .catch((reason) => {});
        break;
      case "/firststeps/price":
        postData("/api/profile/price", {
          projectRate: projectRate,
          hourlyRate: hourlyRate,
          employeeRate: employeeRate,
          pricingType: pricingType,
        })
          .then((value) => {
            router.push(pages[pageIndex + 1].path);
          })
          .catch((reason) => {});
        break;
      case "/firststeps/about":
        postData("/api/profile/about", { about: about })
          .then((value) => {
            localStorage.removeItem("projectRate");
            localStorage.removeItem("hourlyRate");
            localStorage.removeItem("education");
            localStorage.removeItem("experience");
            localStorage.removeItem("languages");
            localStorage.removeItem("skills");
            router.push("/");
          })
          .catch((reason) => {});
        break;
    }
  };

  const loading = useFirstStepsLoading();

  if (session.status === "loading") {
    return <Spinner width="w-20" height="w-20" />;
  } else {
    if (loading || session.data?.user.role === "CLIENT") {
      return redirect("/");
    } else {
      return (
        <AnimatePresence>
          <div className="min-h-screen bg-firstStepsBg flex flex-col">
            {/* ============== Head Tag =============== */}
            <HeadTag title="Log In - Bespace" />

            {/* ================== Header =================== */}
            <LoginSignupHeader />
            <main className="flex flex-col my-auto">
              {/* xl:my-14 lg:my-10 md:my-7 my-5 */}
              <section className="container bg-firstStepsBg mx-auto py-3 md:px-5 sm:px-7 px-3">
                <div className={"text-zinc-950 font-semibold"}>{children}</div>
              </section>
            </main>
            <footer className="mt-auto border-t border-gray-400">
              <div className="container flex justify-between font-semibold text-sm md:text-lg mx-auto py-5 md:px-5 sm:px-7 px-3">
                <Link
                  className={`${pageIndex == 0 ? "" : "border-2 rounded-xl md:rounded-xl text-zinc-950 px-2 md:px-6 py-2"}`}
                  onClick={() => router.push(pages[pageIndex - 1].path)}
                  href={pageIndex >= 1 ? pages[pageIndex - 1].path : ""}
                >
                  {pages[pageIndex].back}
                </Link>
                <div className={"flex items-center"}>
                  {pages[pageIndex].skip && (
                    <Link
                      className={`mr-2 md:mr-6 text-zinc-950`}
                      onClick={() => {
                        const page = pages[pageIndex].path.split("/")[-1];
                        if (typeof window !== "undefined") {
                          localStorage.removeItem(page);
                        }
                        router.push(pages[pageIndex + 1].path);
                      }}
                      href={
                        pageIndex !== pages.length - 1
                          ? pages[pageIndex + 1].path
                          : ""
                      }
                    >
                      Пропустить
                    </Link>
                  )}
                  <span
                    className={`${couldNext() ? "cursor-pointer text-white px-6 py-2 bg-[#4ea8bc] border-2 border-amber-white rounded-xl md:rounded-xl" : "pointer-events-none border-2 border-amber-white rounded-3xl px-6 py-2 bg-gray-300 text-white"}`}
                    onClick={handleNext}
                  >
                    {pages[pageIndex].next}
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </AnimatePresence>
      );
    }
  }
}

export default Layout;
