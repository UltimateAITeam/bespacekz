import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import {
  getStaffingCategoryBySlug,
  staffingCategories,
} from "@/libs/staffing-data";
import { StaffingRequestForm } from "@/components/staffing/StaffingRequestForm";

interface StaffingCategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return staffingCategories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }: StaffingCategoryPageProps) {
  const category = getStaffingCategoryBySlug(params.category);
  if (!category) {
    return { title: "Направление не найдено - Bespace" };
  }
  return {
    title: `Поиск специалиста: ${category.title} - Bespace`,
    description: category.description,
  };
}

export default function StaffingCategoryPage({
  params,
}: StaffingCategoryPageProps) {
  const category = getStaffingCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  return (
    <div className="font-roboto">
      <section className="header-bg">
        <div className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
          <Link
            href="/staffing"
            className="inline-flex items-center gap-2 text-primary-6 font-semibold hover:underline mb-6"
          >
            <FaArrowLeft className="text-sm" />
            Все направления
          </Link>
          <h1 className="font-bold text-4xl lg:text-5xl !leading-tight text-mainText mb-4">
            Поиск талантов: {category.title}
          </h1>
          <p className="text-lg text-zinc-600 font-medium max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      <section className="container mx-auto py-16 md:px-5 sm:px-7 px-3">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-mainText lg:text-2xl text-xl font-bold mb-5">
              Кого мы подбираем
            </h2>
            <ul className="space-y-3">
              {category.roles.map((role) => (
                <li
                  key={role}
                  className="bg-white rounded-xl p-4 shadow-card text-zinc-700 font-medium"
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/candidates"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white/60 px-7 py-3 text-zinc-700 font-semibold transition hover:bg-white hover:scale-105"
              >
                Посмотреть специалистов самостоятельно
              </Link>
            </div>
          </div>

          <div>
            <StaffingRequestForm defaultCategory={category.title} />
          </div>
        </div>
      </section>
    </div>
  );
}
