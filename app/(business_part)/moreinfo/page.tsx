"use client";
import React, { ReactNode, useEffect } from "react";
import HeadTag from "@/components/brenda_components/HeadTag";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  Checkbox,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { LuDownload } from "react-icons/lu";
// import MoreInfoAvatarModal from "@/components/modals/MoreInfoAvatarModal";
import dynamic from "next/dynamic";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker, {
  DayValue,
} from "@amir04lm26/react-modern-calendar-date-picker";
import CustomDatePicker from "@/components/CustomDatePicker";
import { Role } from "@prisma/client";

interface FormValues {
  first_name: string;
  last_name: string;
  location_city: string;
  phone: string;
  date_of_birth?: Date;
}

interface ClientValues extends FormValues {
  isCompany?: boolean;
  companyInfo?: string;
  sphereOfWork?: string;
}

function Oauth_additional() {
  const session = useSession();
  const [date, setDate] = React.useState<DayValue>(null);
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let role = searchParams.get("role") || "freelancer";

  const router = useRouter();

  const MoreInfoAvatarModal = dynamic(
    () => import("@/components/modals/MoreInfoAvatarModal"),
    {
      ssr: false,
    },
  );

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors, isValid },
  } = useForm<ClientValues>();

  useEffect(() => {
    if (!session.data?.user?.name || session.data?.user?.name == "") return;
    let firstName = session.data?.user?.name?.split(" ")[1];
    let lastName = session.data?.user?.name?.split(" ")[0];
    setValue("first_name", firstName as string);
    setValue("last_name", lastName as string);
  }, [session.data?.user?.name, setValue]);

  const [isLoadingSubmit, setIsLoadingSubmit] = React.useState(false);
  const onSubmit: SubmitHandler<ClientValues> = async (data) => {
    setIsLoadingSubmit(true);
    if (isValid) {
      const req_data = {
        role: role,
        email: session.data?.user.email,
        last_name: data?.last_name,
        name: data?.first_name,
        location: data?.location_city,
        phone: data?.phone,
        birthdate: date
          ? new Date(date.year, date.month - 1, date.day)
          : new Date(),
      };

      if (role === "client") {
        const client_data = {
          email: session.data?.user.email,
          isCompany: data?.isCompany,
          companyInfo: data?.companyInfo,
          sphereOfWork: data?.sphereOfWork,
        };
        await fetch("/api/client_info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(client_data),
        });
      }
      const response = await fetch("/api/oauth_additional", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req_data),
      });

      if (response.ok) {
        await session.update({
          ...session.data,
          user: {
            ...session.data?.user,
            role: role,
          },
        });
        if (role === "client") router.push("/");
        else router.push("/firststeps");
        setIsLoadingSubmit(false);
      }
      setIsLoadingSubmit(false);
    } else {
      console.log("error with form on outh_additional");
      setIsLoadingSubmit(false);
    }
  };

  let displayErrors: any = [];

  Object.values(errors).forEach((error, index) => {
    if (error?.type === "minLength")
      displayErrors.push(
        <li key={index}>Length must be more than 8 symbols</li>,
      );
    if (error?.message)
      displayErrors.push(<li key={index}>{error.message as ReactNode}</li>);
  });

  return (
    <div className={"flex min-h-screen flex-col bg-white"}>
      {/* ============== Head Tag =============== */}
      <HeadTag title="Log In - Bespace" />

      <MoreInfoAvatarModal
        avatar={session.data?.user.image}
        isOpen={isOpen}
        onClose={onClose}
      />

      {/* ================= Main ==================== */}
      <main>
        <section className="container mx-auto my-5 px-3 py-3 sm:flex sm:justify-center sm:px-7 md:my-7 md:px-5 lg:my-10 xl:my-14">
          <div className="rounded-xl border-gray-300 sm:border">
            <div className="flex flex-col items-center justify-center pb-7 sm:px-24 sm:pt-7">
              {/* ================= Form title ==================== */}
              <h2 className="text-2xl font-semibold text-zinc-800 md:text-3xl">
                Additional info
              </h2>

              {/* ================= Login Email Form ==================== */}
              <div className={"flex flex-col gap-4 pt-4 md:flex-row md:gap-36"}>
                <VStack>
                  <Avatar src={session.data?.user.image} size={"2xl"} />
                  <Button leftIcon={<LuDownload />} onClick={() => onOpen()}>
                    Загрузить фотографию
                  </Button>
                </VStack>
                <form
                  className="w-full space-y-4 sm:w-auto"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div
                    className={`rounded border-0 bg-red-500 px-6 py-2 text-center ${displayErrors.length > 0 ? "block" : "hidden"}`}
                  >
                    <ul>{displayErrors}</ul>
                  </div>
                  <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-5">
                    {/* ================= first name input =============== */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="first_name"
                        className="px-1 pb-1 font-medium"
                      >
                        First name:
                      </label>

                      <div className="flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 px-3 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2 xl:px-6">
                        <input
                          type="text"
                          className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                          placeholder="First name"
                          {...register("first_name", {
                            required: "Name is required",
                          })}
                        />
                      </div>
                    </div>

                    {/* ================= last name input  =============== */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="last_name"
                        className="px-1 pb-1 font-medium"
                      >
                        Last name:
                      </label>
                      <div className="flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 px-3 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2 xl:px-6">
                        <input
                          type="text"
                          className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                          placeholder="Last name"
                          {...register("last_name", {
                            required: "Last name is required",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="location_city"
                      className="px-1 pb-1 font-medium"
                    >
                      Location:
                    </label>
                    <select
                      id="Country"
                      defaultValue={"Astana"}
                      {...register("location_city", {
                        required: "Location is required",
                      })}
                      className="text-md block w-full cursor-pointer rounded-lg border-2 border-gray-300 bg-transparent px-8 py-4 font-medium text-zinc-800 focus:border-[#b8d8d4fd]"
                    >
                      <option value="Astana">Astana</option>
                      <option value="Almaty">Almaty</option>
                      <option value="Aktau">Aktau</option>
                      <option value="Aktobe">Aktobe</option>
                      <option value="Atyrau">Atyrau</option>
                      <option value="Kostanay">Kostanay</option>
                      <option value="Karaganda">Karaganda</option>
                      <option value="Kokshetau">Kokshetau</option>
                      <option value="Shymkent">Shymkent</option>
                      <option value="Uralsk">Uralsk</option>
                      <option value="Kyzylorda">Kyzylorda</option>
                      <option value="Semey">Semey</option>
                      <option value="Pavlodar">Pavlodar</option>
                      <option value="Oskemen">Oskemen</option>
                      <option value="Petropavlovsk">Petropavlovsk</option>
                      <option value="Taldykorgan">Taldykorgan</option>
                      <option value="Turkestan">Turkestan</option>
                      <option value="Taraz">Taraz</option>
                      <option value="Temirtau">Temirtau</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="px-1 pb-1 font-medium">
                      Phone:
                    </label>
                    <div className="flex w-full flex-grow items-center rounded-lg border-2 border-gray-300 px-3 py-1.5 ring-[#729bb3] transition hover:bg-[#F3FFFC] hover:ring-2 xl:px-6">
                      <input
                        type="text"
                        className="w-40 flex-grow border-0 bg-transparent text-zinc-700 focus:outline-none focus:ring-0 xl:w-full"
                        placeholder="Phone number"
                        {...register("phone", {
                          required: "Phone is required",
                          min: 11,
                        })}
                      />
                    </div>
                  </div>
                  {role !== "client" && (
                    <>
                      <div className="flex flex-col">
                        <label
                          htmlFor="birthdate"
                          className="px-1 pb-1 font-medium"
                        >
                          Birth date:
                        </label>
                        <CustomDatePicker
                          valueState={date}
                          onChange={setDate}
                        />
                      </div>
                    </>
                  )}
                  {role === "client" && (
                    <div className="flex flex-col">
                      {/* <p className='font-medium px-1 pb-1'>Last name:</p> */}
                      <Checkbox className={"mb-4"} {...register("isCompany")}>
                        Is it a company account?
                      </Checkbox>
                      <p className="px-1 pb-1 font-medium">
                        Данные о компании:
                      </p>
                      <Textarea
                        placeholder={
                          "Write something about you/your company..."
                        }
                        className={"mb-2"}
                        {...register("companyInfo", {
                          required: "Company info is required",
                        })}
                      />
                      <p className="px-1 pb-1 font-medium">
                        Сфера деятельности:
                      </p>
                      <Textarea
                        placeholder={"Краткое описание отрасли или области..."}
                        className={"mb-2"}
                        {...register("sphereOfWork", {
                          required: "Sphere of work is required",
                        })}
                      />
                    </div>
                  )}
                  <Button
                    colorScheme="facebook"
                    isLoading={isLoadingSubmit}
                    isDisabled={!isValid || (role === "freelancer" && !date)}
                    className="w-full rounded-full bg-[#0C4A6E] px-3 py-2 font-semibold text-white transition hover:bg-[#18465f]"
                    type="submit"
                  >
                    Continue
                  </Button>
                </form>
              </div>

              {/* ================= Or section ==================== */}
              {/*<div className="flex w-full mt-5 items-center space-x-2">*/}
              {/*    <span className="border-b w-full border-gray-300 mt-1"></span>*/}
              {/*    <span className="text-zinc-600">or</span>*/}
              {/*    <span className="border-b w-full border-gray-300 mt-1"></span>*/}
              {/*</div>*/}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Oauth_additional;
