import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const BannerContainer = ({ heading, des, btnI, btnII, img }) => {
  // ====================== Hooks call ==========================
  const router = useRouter();

  return (
    <div className="container mx-auto mt-5 px-3 sm:px-7 md:px-3">
      <section className="grid grid-cols-1 rounded-xl bg-gradient-to-tr from-[#99F6E4] to-[#A5F3FC] px-3 py-3 sm:px-5 md:grid-cols-2 md:gap-x-10 lg:gap-x-16 xl:gap-x-20">
        <div className="ml-1 mt-1 lg:ml-2 lg:mt-2">
          <motion.h2
            className="text-4xl font-semibold text-zinc-700 lg:text-5xl 2xl:text-6xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {heading}
          </motion.h2>
          <motion.p
            className="mt-2 text-lg text-zinc-700 lg:mt-5 xl:text-xl"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {des}
          </motion.p>
          <div className="mt-5 inline-flex flex-col space-x-0 space-y-3 sm:mt-9 sm:flex sm:flex-row sm:items-center sm:space-x-7 sm:space-y-0 lg:mt-14">
            <motion.button
              className="rounded-full bg-zinc-700 px-5 py-2 font-semibold text-white transition hover:bg-zinc-600"
              onClick={() => router.push("#")}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {btnI.text}
            </motion.button>
            <motion.button
              className="rounded-full border border-zinc-700 bg-transparent px-5 py-2 font-semibold text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-500"
              onClick={() => router.push("#")}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {btnII.text}
            </motion.button>
          </div>
        </div>
        <motion.div
          className="hidden justify-self-end md:block"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={img}
            width={592}
            height={457}
            alt="banner-image"
            className="rounded-xl"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default BannerContainer;
