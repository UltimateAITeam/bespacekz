import { FaSearch, FaCaretRight } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { BiChevronsRight } from "react-icons/bi";
import Link from "next/link";

const ServiceSearch = (props) => {
  // =============== Function ==================
  const SearchForm = (e) => {
    e.preventDefault();
  };

  return (
    <section className="container mx-auto mt-1 px-3 py-3 sm:px-7 md:mt-3 md:px-5">
      {/* =============== Form ============== */}
      <form
        className="relative mt-7 flex flex-grow items-center rounded-full border-2 border-[#a9cac6fd] bg-[#f9fffdfd] px-1 py-1 lg:max-w-lg"
        onSubmit={SearchForm}
      >
        <input
          type="text"
          className="mx-3 flex-grow bg-transparent text-zinc-700 focus:outline-none"
          placeholder="Search projects"
        />
        <span className="cursor-pointer rounded-full bg-zinc-800 px-2 py-1 duration-300 ease-in hover:bg-[#2b4241fd]">
          <FaSearch className="h-6 text-white" />
        </span>
      </form>

      <div className="mt-7 flex flex-col space-y-3 md:mt-10 md:space-y-4">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <FiHome className="text-zinc-800" />
          <BiChevronsRight className="text-[11px] text-zinc-500" />
          <span className="text-zinc-800">{props.textI}</span>
          <BiChevronsRight className="text-[11px] text-zinc-500" />
          <span className="text-zinc-800">{props.textII}</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[#0C4A6E] lg:text-4xl">
            {" "}
            {props.headText}{" "}
          </h2>
        </div>
        <div className="flex flex-col space-x-1 space-y-3 lg:flex-row lg:items-center lg:space-y-0">
          <p className="text-lg text-zinc-500 sm:text-xl">{props.des}</p>
          <Link href={props.link}>
            <span className="flex cursor-pointer items-center text-lg font-semibold text-sky-700 transition hover:underline sm:text-xl">
              {" "}
              {props.linkText} <FaCaretRight className="mt-1" />{" "}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSearch;
