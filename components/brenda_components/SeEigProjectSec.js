import { HiArrowSmRight } from "react-icons/hi";
import Link from "next/link";

const SeEigProjectSec = (props) => {
  return (
    <section className="container mx-auto mt-4 px-3 py-3 sm:mt-5 sm:px-7 md:px-5 xl:mt-7 2xl:mt-10">
      <h2 className="text-2xl font-semibold text-zinc-800 xl:text-3xl">
        {props.headText}
      </h2>

      <div className="relative flex items-center">
        <div className="mt-4 flex w-full flex-col space-y-4 lg:mt-5 lg:flex-row lg:space-x-7 lg:space-y-0 2xl:space-x-9">
          {props.projectList.map((curVal) => (
            <Link href={curVal.link} key={curVal.id}>
              <div className="w-full cursor-pointer rounded-xl border bg-[#CCFBF1] bg-transparent duration-200 ease-in hover:bg-[#bfeee4] lg:max-w-[330px]">
                <div className="flex flex-col gap-y-3 px-3 py-4 sm:px-4">
                  <h5 className="text-zinc-500"> {curVal.name} </h5>
                  <h4 className="font-semibold text-zinc-800">{curVal.des}</h4>
                  <span className="text-600 text-zinc-600 hover:underline">
                    {curVal.linkText}
                    <HiArrowSmRight className="ml-1 inline" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeEigProjectSec;
