import { FaStar, FaChevronRight } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const SeSevProjectSec = (props) => {
  // ==================== Hooks Call ==============================
  const router = useRouter();

  return (
    <section className="container mx-auto mt-4 px-3 py-3 sm:mt-5 sm:px-7 md:px-5 xl:mt-7 2xl:mt-10">
      <h2 className="text-2xl font-semibold text-zinc-800">{props.headText}</h2>

      <div className="relative flex flex-col">
        <div className="mt-4 grid w-full gap-x-0 gap-y-4 sm:w-auto sm:grid-cols-2 sm:gap-x-4 md:gap-x-7 md:gap-y-7 lg:mt-5 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-x-10 2xl:gap-y-10">
          {props.projectList.map((curVal) => (
            <Link href={curVal.link} key={curVal.id}>
              <div className="h-auto w-full cursor-pointer rounded-xl border border-zinc-300 bg-transparent duration-200 ease-in hover:bg-[#ebfffb]">
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

        <button
          className="mx-auto mt-10 flex items-center rounded-full border border-zinc-700 bg-transparent px-5 py-2 font-semibold text-zinc-700 transition hover:border-zinc-600 hover:bg-zinc-100 hover:text-zinc-600"
          onClick={() => router.push(props.btn.link)}
        >
          {props.btn.text}
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default SeSevProjectSec;
