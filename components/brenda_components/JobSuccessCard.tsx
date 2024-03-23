import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const JobSuccessCard = () => {
  // ============= Hooks Call =================
  const [scale, setScale] = useState(true);

  return (
    <Link href="#">
      <motion.div
        className="absolute right-[-1rem] top-[-1rem] z-[9] hidden cursor-pointer flex-col space-y-2 rounded-lg bg-[#F3FFFC] px-3 py-2 shadow-2xl duration-200 ease-in hover:scale-[102%] lg:flex"
        onMouseOver={() => setScale(false)}
        onMouseOut={() => setScale(true)}
        initial={{ opacity: 0, x: -100, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.9 }}
      >
        <span className="text-[13px] font-semibold text-zinc-700">
          {/* Today Job Success */}
          Успешные кандидаты
        </span>
        <div className="flex space-x-[-3px]">
          <span className="translate-x-0">
            <Image
              src="/images/av1.png"
              height={35}
              width={35}
              className="rounded-full"
              alt="avater-img1"
            />
          </span>
          <span
            className={`${scale === false ? "translate-x-0" : "translate-x-[-0.7rem]"} duration-300 ease-in`}
          >
            <Image
              src="/images/av2.png"
              height={35}
              width={35}
              className="rounded-full"
              alt="avater-img2"
            />
          </span>
          <span
            className={`${scale === false ? "translate-x-0" : "translate-x-[-1.4rem]"} duration-300 ease-in`}
          >
            <Image
              src="/images/av3.png"
              height={35}
              width={35}
              className="rounded-full"
              alt="avater-img3"
            />
          </span>
          <span
            className={`${scale === false ? "translate-x-0" : "translate-x-[-2.1rem]"} duration-300 ease-in`}
          >
            <Image
              src="/images/av4.png"
              height={35}
              width={35}
              className="rounded-full"
              alt="avater-img4"
            />
          </span>
          <span
            className={`bg-gradiant-to-r h-[35px] w-[35px] cursor-pointer rounded-full bg-gradient-to-tr from-[#DAF3ED] via-[#F3F6D4] to-[#CFECFE] py-2 text-center text-[10px] font-semibold ${scale === false ? "translate-x-0" : "translate-x-[-2.8rem]"} duration-300 ease-in`}
          >
            2k+
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default JobSuccessCard;
