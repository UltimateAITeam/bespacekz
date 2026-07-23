import { getServiceBySlug, servicesData } from "@/libs/services-data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
          className="text-primary-6 font-semibold hover:underline"
        >
          ← Каталог проектов
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 mb-16 items-center">
        <div className="relative w-full h-72 md:h-96 bg-cardBg rounded-xl overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain p-8"
          />
        </div>

        <div className="flex flex-col space-y-5">
          <h1 className="text-[#0C4A6E] lg:text-4xl text-3xl font-bold">
            {service.title}
          </h1>
          <p className="text-zinc-500 font-semibold lg:text-lg text-md">
            {service.description}
          </p>
          <Link
            href="/signup"
            className="w-fit p-3 px-6 rounded-xl bg-primary-6 text-white font-semibold"
          >
            Заказать проект
          </Link>
        </div>
      </div>
    </div>
  );
}
