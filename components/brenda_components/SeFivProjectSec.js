import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

const SeFivProjectSec = (props) => {
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
          className={`absolute left-0 z-10 mt-3 hidden rounded-full bg-zinc-200 px-4 py-4 text-sm text-zinc-800 shadow-xl transition duration-200 ease-in hover:bg-zinc-300 sm:block`}
          onClick={SlideLeft}
        >
          <FaChevronLeft />
        </button>
        <div
          className="scroll sm:scrollbar-hide mx-0 mt-4 flex space-x-5 overflow-x-scroll scroll-smooth sm:mx-2 md:mx-3 lg:mt-5 xl:mx-4"
          ref={slider}
        >
          {props.projectList.map((curVal) => (
            <Link href={curVal.link} key={curVal.id}>
              <div
                className="grid min-w-[200px] cursor-pointer grid-cols-3 rounded-xl border bg-[#CCFBF1] bg-transparent duration-200 ease-in hover:bg-[#bfeee4] sm:min-w-[300px] lg:min-w-[350px]"
                ref={scrollDiv}
              >
                <Image
                  src={curVal.image.src}
                  width={300}
                  height={210}
                  layout="responsive"
                  alt={curVal.image.alt}
                  className="col-span-1 rounded-l-xl border border-zinc-300"
                />
                <div className="lg:pspace-y-1 y-3 col-span-2 my-auto px-3 py-2 sm:px-4 sm:py-4 md:py-2">
                  <h4 className="font-semibold text-zinc-800">{curVal.des}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ================ Right Button ================= */}
        <button
          className={`absolute right-0 z-10 mt-3 hidden rounded-full bg-zinc-200 px-4 py-4 text-sm text-zinc-800 shadow-xl transition duration-200 ease-in hover:bg-zinc-300 sm:block`}
          onClick={SlideRight}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default SeFivProjectSec;
