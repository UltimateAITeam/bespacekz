import { servicesData } from "@/libs/services-data";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Каталог проектов - Bespace",
  description:
    "Просмотрите и приобретите проекты с четким описанием и ценой.",
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-3 md:px-5 sm:px-7 px-3 space-y-3">
      <div className="mt-7 mb-10">
        <h1 className="text-mainText lg:text-4xl text-3xl font-bold mb-3">
          Каталог проектов
        </h1>
        <p className="text-zinc-500 font-semibold lg:text-lg text-md">
          Просмотрите и приобретите проекты с четким описанием и ценой.
        </p>
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-16">
        {servicesData.map((service) => (
          <Link href={`/services/${service.slug}`} key={service.id}>
            <div className="bg-cardBg rounded-xl overflow-hidden cursor-pointer transition duration-300 shadow-card hover:shadow-soft hover:-translate-y-1 h-full flex flex-col">
              <div className="relative w-full h-44 bg-white">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-5 flex flex-col space-y-2 flex-1">
                <h3 className="text-zinc-700 font-semibold text-xl">
                  {service.title}
                </h3>
                <p className="text-zinc-500 font-medium text-sm">
                  {service.description}
                </p>
                <span className="text-primary-6 font-semibold text-sm !mt-auto pt-2">
                  Подробнее →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
