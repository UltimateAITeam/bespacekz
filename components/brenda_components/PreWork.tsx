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
    <section className="container mx-auto lg:mt-14 mt-5 py-3 md:px-5 sm:px-7 px-3">
      <h2 className="xl:text-4xl text-3xl font-semibold text-zinc-800">
        {props.headText}
      </h2>
      <p className="mt-2 text-zinc-600 xl:text-xl sm:text-lg text-md">
        {props.headDes}
      </p>

      <motion.div
        className="2xl:px-10 xl:px-5 lg:px-3 md:px-0 sm:px-2 px-0 lg:mt-9 mt-5"
        initial={{ y: "100", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex md:flex-row flex-col lg:space-x-20 md:space-x-10 space-x-0 justify-between bg-gradient-to-b from-cyan-100 to-teal-100 rounded-xl shadow-sm">
          <div className="sm:pl-7 pl-4 py-3 flex flex-col justify-between items-start">
            <ul className="flex flex-col sm:space-y-3 space-y-2">
              {props.list.map((curVal) => (
                <li
                  className={`cursor-pointer sm:text-lg text-md font-semibold flex items-center duration-200 ease-in hover:text-zinc-700 ${listI === true && curVal.id == 1 ? "text-zinc-800 ml-2" : "text-zinc-500"} ${listII === true && curVal.id == 2 ? "text-zinc-800 ml-2" : "text-zinc-500"} ${listIII === true && curVal.id == 3 ? "text-zinc-800 ml-2" : "text-zinc-500"} ${listIv === true && curVal.id == 4 ? "text-zinc-800 ml-2" : "text-zinc-500"} ${listV === true && curVal.id == 5 ? "text-zinc-800 ml-2" : "text-zinc-500"} ${listVi === true && curVal.id == 6 ? "text-zinc-800 ml-2" : "text-zinc-500"}`}
                  key={curVal.id}
                  onClick={() => listHandle(curVal.id)}
                >
                  {curVal.name}
                </li>
              ))}
            </ul>
            <button
              className="bg-zinc-800 md:px-6 px-5 md:mr-0 mr-3 py-2 mb-3 transition text-white rounded-full font-semibold hover:bg-zinc-700 mt-3"
              onClick={() => router.push("#")}
            >
              {props.btn.text}
            </button>
          </div>

          {listI && (
            <div
              style={{ backgroundImage: `url(${props.imageI})` }}
              className={`md:w-[60%] w-full md:h-[475px] h-[250px] bg-no-repeat bg-cover md:rounded-r-xl md:rounded-bl-none rounded-b-xl`}
            ></div>
          )}
          {listII && (
            <div
              style={{ backgroundImage: `url(${props.imageII})` }}
              className="md:w-[60%] w-full md:h-[475px] h-[250px] bg-no-repeat bg-cover md:rounded-r-xl md:rounded-bl-none rounded-b-xl"
            ></div>
          )}
          {listIII && (
            <div
              style={{ backgroundImage: `url(${props.imageIII})` }}
              className="md:w-[60%] w-full md:h-[475px] h-[250px] bg-no-repeat bg-cover md:rounded-r-xl md:rounded-bl-none rounded-b-xl"
            ></div>
          )}
          {listIv && (
            <div
              style={{ backgroundImage: `url(${props.imageIv})` }}
              className="md:w-[60%] w-full md:h-[475px] h-[250px] bg-no-repeat bg-cover md:rounded-r-xl md:rounded-bl-none rounded-b-xl"
            ></div>
          )}
          {listV && (
            <div
              style={{ backgroundImage: `url(${props.imageV})` }}
              className="md:w-[60%] w-full md:h-[475px] h-[250px] bg-no-repeat bg-cover md:rounded-r-xl md:rounded-bl-none rounded-b-xl"
            ></div>
          )}
          {listVi && (
            <div
              style={{ backgroundImage: `url(${props.imageVi})` }}
              className="md:w-[60%] w-full md:h-[475px] h-[250px] bg-no-repeat bg-cover md:rounded-r-xl md:rounded-bl-none rounded-b-xl"
            ></div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default PreWork;
