import { cn } from "@/libs/utils";
import { CurrencyType } from "@prisma/client";
import { forwardRef, type HTMLAttributes } from "react";

interface CurrencyIconProps {
  currency: CurrencyType;
}

const CURRENCY_MAP: Record<CurrencyType, { value: string }> = {
  KZT: { value: "₸" },
  EUR: { value: "€" },
  USD: { value: "$" },
  RUB: { value: "₽" },
};
// forwardRef<Type for ref, Type for props>()
const CurrencyIcon = forwardRef<
  HTMLSpanElement,
  HTMLAttributes<HTMLSpanElement> & CurrencyIconProps
>(({ className, currency, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "h-[1em] w-[1em] shrink-0 text-center align-middle !leading-none",
        className,
      )}
      {...props}
    >
      {CURRENCY_MAP[currency].value}
    </span>
  );
});
CurrencyIcon.displayName = "CurrencyIcon";

export default CurrencyIcon;
