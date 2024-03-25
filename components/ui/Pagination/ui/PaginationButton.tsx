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
        "relative align-middle select-none font-dm-sans font-normal text-center uppercase transition-all disabled:opacity-50 border border-[#111111]/10 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-[4px] bg-general-background text-general-onSurface2 shadow-sm shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none",
        className,
      )}
      {...props}
    >
      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-sm">
        {children}
      </span>
    </button>
  );
};
