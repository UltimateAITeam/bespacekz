import Image from "next/image";
import { useRouter } from "next/router";

const QuestionAsk = (props) => {
  // ======================== Hooks call =============================
  const router = useRouter();

  return (
    <section className="container mx-auto mt-5 px-3 py-3 sm:px-7 md:px-5 lg:mt-20">
      <div className="flex flex-col items-center rounded-xl bg-[#DAF3ED] px-3 sm:px-2 md:px-3 xl:px-5 2xl:px-10">
        {/* ================ This is alwayse same not change =================== */}
        <div>
          <h2 className="mb-5 mt-7 text-3xl font-semibold text-zinc-800 xl:text-4xl">
            Frequently asked questions
          </h2>
          <Image
            src={"/images/ask.png"}
            width={550}
            height={550}
            alt="question-ask-image"
          />
        </div>

        {/* ==================== This is props to chagne ======================= */}
        <div className="px-0 py-5 sm:px-5 lg:px-7">
          <div>
            <h4 className="mt-5 text-xl font-semibold text-zinc-800 sm:mt-7 sm:text-2xl xl:text-3xl">
              {props.firstHeadText}
            </h4>
            <p className="text-md mt-2 text-zinc-600 sm:text-lg xl:text-xl">
              {props.firstDesText}
            </p>
          </div>

          <div>
            <h4 className="mt-5 text-xl font-semibold text-zinc-800 sm:mt-7 sm:text-2xl xl:text-3xl">
              {props.secondHeadText}
            </h4>
            <p className="text-md mt-2 text-zinc-600 sm:text-lg xl:text-xl">
              {props.secondDesText}
            </p>
          </div>

          <div>
            <h4 className="mt-5 text-xl font-semibold text-zinc-800 sm:mt-7 sm:text-2xl xl:text-3xl">
              {props.thirdHeadText}
            </h4>
            <p className="text-md mt-2 text-zinc-600 sm:text-lg xl:text-xl">
              {props.thirdDesText}
            </p>
          </div>

          <div>
            <h4 className="mt-5 text-xl font-semibold text-zinc-800 sm:mt-7 sm:text-2xl xl:text-3xl">
              {props.fourHeadText}
            </h4>
            <p className="text-md mt-2 text-zinc-600 sm:text-lg xl:text-xl">
              {props.fourDesText}
            </p>
          </div>

          <div className="mt-7 flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-3 sm:space-y-0">
            <span className="text-lg font-semibold text-zinc-800">
              {props.lastLeftText}
            </span>
            <button
              className="text-lg font-semibold text-sky-900 underline"
              onClick={() => router.push(props.lastRightBtn.link)}
            >
              {props.lastRightBtn.text}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionAsk;
