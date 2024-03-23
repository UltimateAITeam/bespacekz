import { FaStar } from "react-icons/fa";
import ExpartBox from "./ExpartsBox";

const TrustedExp = (props) => {
  return (
    <section className="container mx-auto mt-5 space-y-3 px-3 py-3 sm:px-7 md:mt-10 md:px-5 lg:mt-16">
      <div className="px-0 sm:px-2 md:px-3 xl:px-5 2xl:px-10">
        <h2 className="text-3xl font-semibold text-zinc-800 xl:text-4xl">
          {props.headText}
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-10 xl:space-x-20">
          <div className="mt-5 lg:mt-7">
            <div className="flex items-center space-x-2">
              <FaStar className="text-3xl text-green-700 xl:text-3xl" />
              <h5 className="text-2xl font-semibold text-zinc-800 lg:text-3xl xl:text-3xl">
                {props.rating}
              </h5>
            </div>
            <p className="text-md my-2 font-semibold text-zinc-500 xl:text-lg">
              {props.ratingText}
            </p>
          </div>

          <div className="mt-1 md:mt-5 lg:mt-7">
            <div>
              <h5 className="text-2xl font-semibold text-zinc-800 lg:text-3xl xl:text-3xl">
                {props.contracts}
              </h5>
            </div>
            <p className="text-md my-2 font-semibold text-zinc-500 xl:text-lg">
              {props.contractsText}
            </p>
          </div>

          <div className="mt-1 md:mt-5 lg:mt-7">
            <div>
              <h5 className="text-2xl font-semibold text-zinc-800 lg:text-3xl xl:text-3xl">
                {props.skills}
              </h5>
            </div>
            <p className="text-md my-2 font-semibold text-zinc-500 xl:text-lg">
              {props.skillsText}
            </p>
          </div>
        </div>

        {/* ================ Exparts Box ============== */}
        <ExpartBox data={props.cardData} />
      </div>
    </section>
  );
};

export default TrustedExp;
