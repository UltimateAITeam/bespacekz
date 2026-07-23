import { getServiceBySlug, servicesData } from "@/libs/services-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

interface ServiceDetailPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return { title: "Проект не найден - Bespace" };
  }
  return {
    title: `${service.title} - Bespace`,
    description: service.description,
  };
}

export default function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto py-3 md:px-5 sm:px-7 px-3 space-y-3">
      <div className="mt-7 mb-3">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-primary-6 font-semibold hover:underline"
        >
          <FaArrowLeft className="text-sm" />
          Каталог проектов
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-16 items-center">
        <div className="relative w-full h-72 md:h-96 bg-cardBg rounded-xl overflow-hidden shadow-card">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain p-8"
          />
        </div>

        <div className="flex flex-col space-y-5">
          <h1 className="text-mainText lg:text-4xl text-3xl font-bold">
            {service.title}
          </h1>
          <p className="text-zinc-500 font-semibold lg:text-lg text-md">
            {service.description}
          </p>
          <Link
            href="/signup"
            className="w-fit inline-flex items-center justify-center p-3 px-6 rounded-xl bg-primary-6 text-white font-semibold shadow-soft transition hover:bg-primary-6/90 hover:scale-105"
          >
            Заказать проект
          </Link>
        </div>
      </div>

      {/* ================= Other services ================= */}
      <div className="mb-16">
        <h2 className="text-mainText lg:text-2xl text-xl font-bold mb-6">
          Другие проекты
        </h2>
        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {servicesData
            .filter((item) => item.slug !== service.slug)
            .slice(0, 4)
            .map((item) => (
              <Link href={`/services/${item.slug}`} key={item.id}>
                <div className="bg-cardBg rounded-xl overflow-hidden cursor-pointer transition duration-300 shadow-card hover:shadow-soft hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative w-full h-32 bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-zinc-700 font-semibold text-base">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
