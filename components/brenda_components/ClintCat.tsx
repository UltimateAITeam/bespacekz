import { FaKeyboard } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { BsFillBagFill } from "react-icons/bs";
import { AiFillTrophy } from "react-icons/ai";
import Link from "next/link";

const ClintCat = () => {
  const Data = [
    {
      id: 1,
      name: "Закажите услуги эксперта",
      leftIcon: <FaKeyboard />,
      linkText: "Выбор топ-специалистов",
      rightIcon: <FiArrowRight />,
      link: "#",
    },
    {
      id: 2,
      name: "Откройте для себя проекты под ключ",
      leftIcon: <BsFillBagFill />,
      linkText: "Обзор готовых решений",
      rightIcon: <FiArrowRight />,
      link: "#",
    },
    {
      id: 3,
      name: "Получите идеального кандидата",
      leftIcon: <AiFillTrophy />,
      linkText: "Услуги поиска талантов",
      rightIcon: <FiArrowRight />,
      link: "#",
    },
  ];

  return (
    <>
      {Data.map((curVal) => (
        <Link href={curVal.link} key={curVal.id}>
          {/* bg-gradient-to-tr from-[#CCFBF1] to-[#CFFAFE] */}
          <div className="flex h-full cursor-pointer flex-col justify-between space-y-5 rounded-md bg-gradient-to-tr from-[#CCFBF1] to-[#CFFAFE] px-5 py-5 transition duration-300 hover:scale-105 hover:from-cyan-200 hover:to-[#e1f7fa] hover:shadow-lg hover:shadow-cyan-200/50 xl:space-y-7 xl:px-7">
            <h5 className="text-xl font-semibold text-zinc-700 lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {curVal.name}
            </h5>

            <div className="flex items-center space-x-1 pb-2 md:space-x-0 lg:space-x-2 xl:pb-5">
              <span className="text-md text-zinc-700 lg:text-xl">
                {curVal.leftIcon}
              </span>
              <span className="text-md font-semibold text-zinc-700 lg:text-xl">
                {curVal.linkText}
              </span>
              <span className="text-md text-zinc-700 lg:ml-5 lg:text-xl">
                {curVal.rightIcon}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ClintCat;
