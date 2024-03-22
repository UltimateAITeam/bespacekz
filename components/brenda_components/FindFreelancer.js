import Link from "next/link";

const FindFreelancer = (props) => {
  return (
    <section className="container mx-auto my-5 px-3 py-3 sm:px-7 md:px-5 lg:my-16">
      <h2 className="mb-5 text-3xl font-semibold text-zinc-800 sm:mt-7 xl:text-4xl">
        {props.headText}
      </h2>

      <div className="md:mb-10 md:mt-3">
        <h4 className="mt-5 text-xl font-semibold text-zinc-700 sm:mt-9 sm:text-2xl xl:text-3xl">
          {props.FindFreelancerList.headText}
        </h4>

        <ul className="mt-4 grid gap-x-10 px-5 sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4">
          {props.FindFreelancerList.listItem.map((curVal) => (
            <li
              className="cursor-pointer py-2 font-semibold text-zinc-500 hover:text-sky-700 hover:underline"
              key={curVal.id}
            >
              <Link href={curVal.link}>{curVal.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FindFreelancer;
