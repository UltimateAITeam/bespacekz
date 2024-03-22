import { FaStar, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

const SeFouProjectSec = (props) => {
  // =============== Hooks ====================
  const slider = useRef();
  const scrollDiv = useRef();

  // =============== Function ==================
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
          className={`absolute left-0 z-10 rounded-full bg-zinc-200 px-4 py-4 text-zinc-800 shadow-xl transition duration-200 ease-in hover:bg-zinc-300 lg:text-2xl`}
          onClick={SlideLeft}
        >
          <FaChevronLeft />
        </button>
        <div
          className="scroll scrollbar-hide mx-2 mt-4 flex space-x-5 overflow-x-scroll scroll-smooth md:mx-3 lg:mt-5 lg:space-x-7 2xl:mx-4 2xl:space-x-10"
          ref={slider}
        >
          {props.projectList.map((curVal) => (
            <Link href={curVal.link} key={curVal.id}>
              <div
                className="w-full min-w-[250px] cursor-pointer rounded-xl border border-zinc-300 bg-transparent duration-200 ease-in hover:bg-[#ebfffb] lg:min-w-[300px] xl:min-w-[340px]"
                ref={scrollDiv}
              >
                <div>
                  <Image
                    src={curVal.image.src}
                    width={300}
                    height={210}
                    layout="responsive"
                    alt={curVal.image.alt}
                    className="rounded-t-xl border border-zinc-300"
                  />
                  <div className="flex flex-col justify-between space-y-2 border-b border-zinc-300 px-3 py-2 sm:px-4 sm:py-4 md:py-2 lg:py-3 2xl:space-y-3">
                    <h4 className="font-semibold text-zinc-800">
                      {curVal.des}
                    </h4>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-zinc-800">
                          {curVal.f_left.textI}{" "}
                          <b className="text-zinc-800">
                            {" "}
                            {curVal.f_left.textII}{" "}
                          </b>
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 text-zinc-600">
                        <MdOutlineWatchLater />
                        <span>{curVal.f_right.text}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between px-4 py-3 text-zinc-800">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={curVal.s_left.img}
                      width={35}
                      height={35}
                      className="rounded-full"
                      alt="freelancer-image"
                    />
                    <span>{curVal.s_left.text}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <FaStar className="text-green-600" />
                    <p className="text-[15px]">
                      {" "}
                      {curVal.s_right.textI}{" "}
                      <span className="text-zinc-600">
                        {" "}
                        {curVal.s_right.textII}{" "}
                      </span>{" "}
                    </p>
                  </div>

                  {/* =================== chat icon ================ */}
                  <div className="absolute bottom-3 left-10 rounded-full border border-white bg-green-600 px-1 py-1"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ================ Right Button ================= */}
        <button
          className={`absolute right-0 z-10 rounded-full bg-zinc-200 px-4 py-4 text-zinc-800 shadow-xl transition duration-200 ease-in hover:bg-zinc-300 lg:text-2xl `}
          onClick={SlideRight}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default SeFouProjectSec;
