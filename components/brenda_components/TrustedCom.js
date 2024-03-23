import Image from "next/image";
import { motion } from "framer-motion";

{
  /* ================= Trusted Company Section ================ */
}
const TrustedCom = () => {
  return (
    <section className="container mx-auto mt-3 px-3 py-3 sm:px-7 md:mt-7 md:px-5 lg:mt-10">
      <motion.div
        className="flex flex-col items-center justify-center space-y-3 border-b pb-3 md:space-x-7 md:pb-5 lg:flex-row lg:space-y-2"
        initial={{ y: "100", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-md mb-2 font-semibold text-zinc-500 md:mb-3 md:text-xl lg:mb-0">
          Trusted by
        </h3>
        <div className="flex space-x-3 sm:space-x-6 xl:space-x-7 2xl:space-x-10">
          <span>
            <Image
              src="/images/paypal.png"
              height={30}
              width={90}
              alt="paypal-img"
            />
          </span>
          <span>
            <Image
              src="/images/adobe.png"
              height={30}
              width={90}
              alt="adobe-img"
            />
          </span>
          <span>
            <Image
              src="/images/oracle.png"
              height={30}
              width={90}
              alt="oracle-img"
            />
          </span>
          <span>
            <Image
              src="/images/google.png"
              height={30}
              width={90}
              alt="google-img"
            />
          </span>
        </div>
        <div className="flex space-x-4 sm:space-x-6 xl:space-x-7 2xl:space-x-10">
          <span>
            <Image
              src="/images/microsoft.png"
              height={30}
              width={110}
              alt="microsoft-img"
            />
          </span>
          <span>
            <Image
              src="/images/airnob.png"
              height={30}
              width={90}
              alt="airbnb-img"
            />
          </span>
          <span>
            <Image
              src="/images/netflix.png"
              height={30}
              width={90}
              alt="netflix-img"
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedCom;
