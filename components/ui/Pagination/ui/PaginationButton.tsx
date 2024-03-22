import { cn } from "@/libs/utils";
import React from "react";

export interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "bg-general-background text-general-onSurface2 relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-[4px] border border-[#111111]/10 text-center align-middle font-dm-sans font-normal uppercase shadow-sm shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
        className,
      )}
      {...props}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm">
        {children}
      </span>
    </button>
  );
};
