import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ExpartBox = ({ data }) => {
  return (
    <div className="scroll relative mt-7 flex items-center gap-y-5 space-x-3 overflow-x-scroll scroll-smooth whitespace-nowrap md:grid md:grid-cols-3 md:items-stretch md:gap-x-5 md:space-x-0 md:whitespace-normal lg:grid-cols-4 lg:overflow-x-hidden xl:gap-x-10 2xl:gap-x-20">
      {data.map((curVal) => (
        <Link href={curVal.link} key={curVal.id}>
          <motion.div
            className="relative flex cursor-pointer flex-col justify-between rounded-lg bg-[#DAF3ED] px-4 py-2 xl:px-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h5 className="text-lg font-semibold text-zinc-800 xl:text-xl">
              {curVal.groupName}
            </h5>

            <div>
              <div className="mt-3 flex space-x-2 xl:mt-5">
                <div className="flex items-center">
                  <FaStar className="text-green-700" />
                  <span className="ml-1 font-semibold text-zinc-700">
                    {curVal.rating}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-zinc-700">
                    {curVal.ratingText}
                  </span>
                </div>
              </div>
              <div className="flex py-3">
                {curVal.imgSection.map((curSubVal) => (
                  <picture
                    className={`mx-[-7px] duration-300 ease-in hover:mx-0`}
                    key={curSubVal.id}
                  >
                    <Image
                      src={curSubVal.img}
                      width={45}
                      height={45}
                      alt="freelancer"
                      className="rounded-full shadow-md"
                    />
                  </picture>
                ))}
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default ExpartBox;
