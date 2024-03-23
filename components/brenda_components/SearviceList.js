import Link from "next/dist/client/link";

const ServiceList = (props) => {
  return (
    <section className="container mx-auto my-4 px-3 py-3 sm:my-5 sm:px-7 md:px-5 lg:my-10 2xl:mt-16">
      <h2 className="text-2xl font-semibold text-zinc-800 xl:text-3xl">
        {props.headText}
      </h2>

      <ul className="my-8 grid grid-cols-1 gap-x-7 gap-y-3 px-1 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
        {props.serviceLink.map((curVal) => (
          <li
            className={`cursor-pointer text-[15px] font-semibold text-zinc-500 hover:underline`}
            key={curVal.id}
          >
            <Link href={curVal.link}>{curVal.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServiceList;
