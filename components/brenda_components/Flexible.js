import { FaStar } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Flexible = (props) => {
  // ======================== Hooks call =============================
  const router = useRouter();

  return (
    <section className="mt-5 bg-[#DAF3ED] px-3 py-3 sm:mt-10 sm:px-7 md:px-9 lg:mt-20 lg:px-5">
      <div className="container mx-auto py-10 md:py-20">
        <div>
          <motion.h2
            className="text-3xl font-semibold text-zinc-800 xl:text-4xl"
            initial={{ y: "100", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {props.firstHead}
          </motion.h2>

          <div className="mt-7 grid grid-cols-1 items-center lg:mt-0 lg:grid-cols-2 lg:gap-x-36 xl:gap-x-40 2xl:gap-x-52">
            <div className="row-start-2 row-end-3 mt-5 space-y-3 md:space-y-5 lg:row-start-1 lg:row-end-2 lg:mt-0">
              <motion.p
                className="text-xl font-semibold text-zinc-600 md:text-2xl 2xl:text-3xl"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {props.firstSubHead}
              </motion.p>
              <motion.div
                className="flex flex-col space-y-3 md:flex-row md:items-center md:space-x-28 md:space-y-0"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <FaStar className="text-green-600" />
                  <FaStar className="text-green-600" />
                  <FaStar className="text-green-600" />
                  <FaStar className="text-green-600" />
                  <FaStar className="text-green-600" />
                  <span className="text-lg font-semibold text-zinc-800">
                    {props.first_F_LeftRating}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-zinc-800">
                    {props.first_F_RightText}
                  </span>
                  <span className="text-lg font-semibold text-zinc-800">
                    {props.first_F_RightValue}
                  </span>
                </div>
              </motion.div>

              <motion.p
                className="text-md font-semibold text-zinc-600 2xl:text-lg"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {props.firstDes}
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center space-x-5 space-y-2 sm:space-y-0"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="text-lg font-semibold text-zinc-800">
                  {props.first_S_LeftText}
                </span>

                <span className="rounded-full bg-gradient-to-tr from-sky-100 to-teal-100 px-3 py-2 font-semibold text-zinc-800 shadow-md">
                  {props.first_S_F_RightValue}
                </span>
                <span className="rounded-full bg-gradient-to-tr from-sky-100 to-teal-100 px-3 py-2 font-semibold text-zinc-800 shadow-md">
                  {props.first_S_S_RightValue}
                </span>
                <span className="rounded-full bg-gradient-to-tr from-sky-100 to-teal-100 px-3 py-2 font-semibold text-zinc-800 shadow-md">
                  {props.first_S_T_RightValue}
                </span>
              </motion.div>
            </div>

            <div className="lg:row-start-0 lg:row-end-0 row-start-1 row-end-2 w-full lg:mt-5">
              <Image
                src={props.firstImage}
                width={600}
                height={490}
                className="rounded-xl"
                layout="responsive"
                alt="related-image"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 md:mt-28">
          <motion.h2
            className="text-start text-3xl font-semibold text-zinc-800 lg:text-end xl:text-4xl"
            initial={{ y: "100", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {props.secondHead}
          </motion.h2>

          <div className="mt-7 grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-x-28 xl:gap-x-40">
            <div className="w-full">
              <Image
                src={props.secondImage}
                width={600}
                height={490}
                className="rounded-xl"
                layout="responsive"
                alt="team-image"
              />
            </div>

            <div className="mt-5 space-y-5 lg:mt-0">
              <motion.p
                className="text-md font-semibold text-zinc-600 2xl:text-lg"
                initial={{ y: "100", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {props.secondDes}
              </motion.p>

              <div className="block justify-between xl:flex xl:items-center xl:space-x-5">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ y: "100", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <span className="text-xl">
                    <FcApproval />
                  </span>

                  <p className="text-lg font-semibold text-zinc-800">
                    {props.secondRightText}
                  </p>
                </motion.div>

                <motion.button
                  className="mt-3 rounded-full bg-zinc-800 px-4 py-2 font-semibold text-white transition hover:bg-zinc-700 xl:mt-0"
                  onClick={() => router.push(props.secondLeftBtn.link)}
                  initial={{ y: "100", opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {props.secondLeftBtn.text}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Flexible;
