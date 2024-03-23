import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/dist/client/link";

const SeSixProjectSec = (props) => {
  // =============== Hooks ====================
  const slider = useRef();
  const scrollDiv = useRef();

  // =============== Function ==================
  const SlideRight = () => {
    slider.current.scrollLeft =
      slider.current.scrollLeft + scrollDiv.current.offsetWidth + 20;
  };

  const SlideLeft = () => {
    slider.current.scrollLeft =
      slider.current.scrollLeft - scrollDiv.current.offsetWidth - 20;
  };

  return (
    <section className="container mx-auto mt-4 px-3 py-3 sm:mt-5 sm:px-7 md:px-5 xl:mt-7 2xl:mt-10">
      <h2 className="text-2xl font-semibold text-zinc-800">{props.headText}</h2>
      <p className="mt-1 text-lg text-zinc-600"> {props.des} </p>

      <div className="relative flex items-center">
        <button
          className={`absolute left-0 z-10 rounded-full bg-zinc-200 px-4 py-4 text-sm text-zinc-800 shadow-xl transition duration-200 ease-in hover:bg-zinc-300 md:hidden`}
          onClick={SlideLeft}
        >
          <FaChevronLeft />
        </button>
        <div
          className="scroll scrollbar-hide mx-2 mt-4 flex space-x-5 overflow-x-scroll scroll-smooth md:mx-0 lg:mt-5 lg:space-x-7 2xl:space-x-10"
          ref={slider}
        >
          {props.projectList.map((curVal) => (
            <Link href={curVal.link} key={curVal.id}>
              <div
                className="w-full min-w-[220px] cursor-pointer rounded-xl border bg-[#CCFBF1] bg-transparent duration-200 ease-in hover:bg-[#bfeee4] lg:min-w-[300px] xl:min-w-[350px] 2xl:min-w-[400px]"
                ref={scrollDiv}
              >
                <div>
                  <Image
                    src={curVal.image.src}
                    width={450}
                    height={250}
                    layout="responsive"
                    alt={curVal.image.alt}
                    className="rounded-t-xl border border-zinc-300"
                  />
                  <div className="flex flex-col space-y-1 px-3 py-2 sm:px-4 sm:py-3 md:py-2 lg:py-3 lg:pl-7">
                    <h4 className="font-semibold text-zinc-800 md:text-lg">
                      {curVal.textI}
                    </h4>
                    <span className="text-600 text-sm text-zinc-600 md:font-semibold">
                      {curVal.textII}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ================ Right Button ================= */}
        <button
          className={`absolute right-0 z-10 rounded-full bg-zinc-200 px-4 py-4 text-sm text-zinc-800 shadow-xl transition duration-200 ease-in hover:bg-zinc-300 md:hidden `}
          onClick={SlideRight}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default SeSixProjectSec;
