import type { PropsWithChildren } from "react";

export default function CandidateLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="container mx-auto mt-3 space-y-3 px-3 py-3 font-roboto sm:px-7 md:px-5">
      <div>{children}</div>
    </div>
  );
}
