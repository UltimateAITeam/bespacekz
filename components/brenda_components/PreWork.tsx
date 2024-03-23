import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const PreWork = (props: {
  headText:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  headDes:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
  list: any[];
  btn: {
    text:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ReactPortal
      | null
      | undefined;
  };
  imageI: any;
  imageII: any;
  imageIII: any;
  imageIv: any;
  imageV: any;
  imageVi: any;
}) => {
  // ================= Hooks call =================
  const router = useRouter();
  const [listI, setListI] = useState(true);
  const [listII, setListII] = useState(false);
  const [listIII, setListIII] = useState(false);
  const [listIv, setListIv] = useState(false);
  const [listV, setListV] = useState(false);
  const [listVi, setListVi] = useState(false);

  // ================== listHandle function =======================
  const listHandle = (id: number) => {
    if (id == 1) {
      setListI(true);
      listII === true ? setListII(false) : null;
      listIII === true ? setListIII(false) : null;
      listIv === true ? setListIv(false) : null;
      listV === true ? setListV(false) : null;
      listVi === true ? setListVi(false) : null;
    }

    if (id == 2) {
      setListII(true);
      listI === true ? setListI(false) : null;
      listIII === true ? setListIII(false) : null;
      listIv === true ? setListIv(false) : null;
      listV === true ? setListV(false) : null;
      listVi === true ? setListVi(false) : null;
    }

    if (id == 3) {
      setListIII(true);
      listI === true ? setListI(false) : null;
      listII === true ? setListII(false) : null;
      listIv === true ? setListIv(false) : null;
      listV === true ? setListV(false) : null;
      listVi === true ? setListVi(false) : null;
    }

    if (id == 4) {
      setListIv(true);
      listI === true ? setListI(false) : null;
      listII === true ? setListII(false) : null;
      listIII === true ? setListIII(false) : null;
      listV === true ? setListV(false) : null;
      listVi === true ? setListVi(false) : null;
    }

    if (id == 5) {
      setListV(true);
      listI === true ? setListI(false) : null;
      listII === true ? setListII(false) : null;
      listIII === true ? setListIII(false) : null;
      listIv === true ? setListIv(false) : null;
      listVi === true ? setListVi(false) : null;
    }

    if (id == 6) {
      setListVi(true);
      listI === true ? setListI(false) : null;
      listII === true ? setListII(false) : null;
      listIII === true ? setListIII(false) : null;
      listIv === true ? setListIv(false) : null;
      listV === true ? setListV(false) : null;
    }
  };

  return (
    <section className="container mx-auto mt-5 px-3 py-3 sm:px-7 md:px-5 lg:mt-14">
      <h2 className="text-3xl font-semibold text-zinc-800 xl:text-4xl">
        {props.headText}
      </h2>
      <p className="text-md mt-2 text-zinc-600 sm:text-lg xl:text-xl">
        {props.headDes}
      </p>

      <motion.div
        className="mt-5 px-0 sm:px-2 md:px-0 lg:mt-9 lg:px-3 xl:px-5 2xl:px-10"
        initial={{ y: "100", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col justify-between space-x-0 rounded-xl bg-gradient-to-b from-cyan-100 to-teal-100 shadow-sm md:flex-row md:space-x-10 lg:space-x-20">
          <div className="flex flex-col items-start justify-between py-3 pl-4 sm:pl-7">
            <ul className="flex flex-col space-y-2 sm:space-y-3">
              {props.list.map((curVal) => (
                <li
                  className={`text-md flex cursor-pointer items-center font-semibold duration-200 ease-in hover:text-zinc-700 sm:text-lg ${listI === true && curVal.id == 1 ? "ml-2 text-zinc-800" : "text-zinc-500"} ${listII === true && curVal.id == 2 ? "ml-2 text-zinc-800" : "text-zinc-500"} ${listIII === true && curVal.id == 3 ? "ml-2 text-zinc-800" : "text-zinc-500"} ${listIv === true && curVal.id == 4 ? "ml-2 text-zinc-800" : "text-zinc-500"} ${listV === true && curVal.id == 5 ? "ml-2 text-zinc-800" : "text-zinc-500"} ${listVi === true && curVal.id == 6 ? "ml-2 text-zinc-800" : "text-zinc-500"}`}
                  key={curVal.id}
                  onClick={() => listHandle(curVal.id)}
                >
                  {curVal.name}
                </li>
              ))}
            </ul>
            <button
              className="mb-3 mr-3 mt-3 rounded-full bg-zinc-800 px-5 py-2 font-semibold text-white transition hover:bg-zinc-700 md:mr-0 md:px-6"
              onClick={() => router.push("#")}
            >
              {props.btn.text}
            </button>
          </div>

          {listI && (
            <div
              style={{ backgroundImage: `url(${props.imageI})` }}
              className={`h-[250px] w-full rounded-b-xl bg-cover bg-no-repeat md:h-[475px] md:w-[60%] md:rounded-r-xl md:rounded-bl-none`}
            ></div>
          )}
          {listII && (
            <div
              style={{ backgroundImage: `url(${props.imageII})` }}
              className="h-[250px] w-full rounded-b-xl bg-cover bg-no-repeat md:h-[475px] md:w-[60%] md:rounded-r-xl md:rounded-bl-none"
            ></div>
          )}
          {listIII && (
            <div
              style={{ backgroundImage: `url(${props.imageIII})` }}
              className="h-[250px] w-full rounded-b-xl bg-cover bg-no-repeat md:h-[475px] md:w-[60%] md:rounded-r-xl md:rounded-bl-none"
            ></div>
          )}
          {listIv && (
            <div
              style={{ backgroundImage: `url(${props.imageIv})` }}
              className="h-[250px] w-full rounded-b-xl bg-cover bg-no-repeat md:h-[475px] md:w-[60%] md:rounded-r-xl md:rounded-bl-none"
            ></div>
          )}
          {listV && (
            <div
              style={{ backgroundImage: `url(${props.imageV})` }}
              className="h-[250px] w-full rounded-b-xl bg-cover bg-no-repeat md:h-[475px] md:w-[60%] md:rounded-r-xl md:rounded-bl-none"
            ></div>
          )}
          {listVi && (
            <div
              style={{ backgroundImage: `url(${props.imageVi})` }}
              className="h-[250px] w-full rounded-b-xl bg-cover bg-no-repeat md:h-[475px] md:w-[60%] md:rounded-r-xl md:rounded-bl-none"
            ></div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PreWork;
