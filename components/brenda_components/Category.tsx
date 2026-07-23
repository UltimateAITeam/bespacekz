import Link from "next/link";
import { motion } from "framer-motion";

interface ICategoryItem {
  id: number;
  name: string;
  skills: string;
}

// NOTE: category browsing is not yet backed by dedicated category pages,
// so every card links to the talent search page for now.
const CATEGORY_LINK = "/candidates";

const Data: ICategoryItem[] = [
  {
    id: 1,
    name: "Информационные технологии",
    skills: "145 проектов",
  },
  {
    id: 2,
    name: "Консультанты по бизнесу",
    skills: "34 проектов",
  },
  {
    id: 3,
    name: "Финансы и бухгалтерия",
    skills: "96 проектов",
  },
  {
    id: 4,
    name: "Маркетинг, PR",
    skills: "64 проектов",
  },
  {
    id: 5,
    name: "Управление персоналом",
    skills: "164 проектов",
  },
  {
    id: 6,
    name: "Юристы",
    skills: "87 проектов",
  },
];

const Category = () => {
  return (
    <>
      {Data.map((curVal) => (
        <Link href={CATEGORY_LINK} key={curVal.id}>
          <motion.div
            className="bg-cardBg xl:px-7 px-5 xl:py-4 py-3 xl:space-y-7 space-y-4 rounded-xl cursor-pointer transition duration-300 hover:shadow-lg hover:shadow-cyan-200/50 hover:scale-105"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h5 className="xl:text-center text-start text-xl text-zinc-700 font-semibold">
              {curVal.name}
            </h5>
            <div className="flex justify-center 2xl:pb-4 xl:pb-3 pb-1">
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
