import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const Category = () => {
  const Data = [
    {
      id: 1,
      name: "Информационные технологии",
      // star: "4.85/5",
      skills: "145 проектов",
      link: "/cat/dev-it",
    },

    {
      id: 2,
      name: "Консультанты по бизнесу",
      // star: "4.91/5",
      skills: "34 проектов",
      link: "/cat/design-creative",
    },

    {
      id: 3,
      name: "Финансы и бухгалтерия",
      // star: "4.77/5",
      skills: "96 проектов",
      link: "/cat/sales-marketing",
    },

    {
      id: 4,
      name: "Маркетинг, PR",
      // star: "4.92/5",
      skills: "64 проектов",
      link: "/cat/writing-translation",
    },

    {
      id: 5,
      name: "Управление персоналом",
      // star: "4.77/5",
      skills: "164 проектов",
      link: "/cat/admin-customer-support",
    },

    {
      id: 6,
      name: "Юристы",
      // star: "4.79/5",
      skills: "87 проектов",
      link: "/cat/finance-accounting",
    },
  ];

  return (
    <>
      {Data.map((curVal: any) => (
        <Link href={curVal.link} key={curVal.id}>
          <motion.div
            // bg-gradient-to-tr from-[#CCFBF1] to-[#CFFAFE]
            className="bg-cardBg xl:px-7 px-5 xl:py-4 py-3 xl:space-y-7 space-y-4 rounded-xl cursor-pointer transition hover:from-cyan-200 hover:to-[#CCFBF1] hover:scale-105"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <h5 className="xl:text-center text-start text-xl text-zinc-700 font-semibold">
              {curVal.name}
            </h5>
            <div className="flex justify-center 2xl:pb-4 xl:pb-3 pb-1">
              {/* <div className="flex items-center space-x-2">
                <FaStar className="text-green-600" />
                <span className="text-zinc-700 font-semibold">
                  {curVal.star}
                </span>
              </div> */}

              <span className="text-zinc-700 font-semibold">
                {curVal.skills}
              </span>
            </div>
          </motion.div>
        </Link>
      ))}
    </>
  );
};

export default Category;
