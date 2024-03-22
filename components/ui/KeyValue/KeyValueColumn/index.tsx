import { cn } from "@/libs/utils";

interface KeyValueColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
}

export const KeyValueColumn = ({
  title,
  value,
  className,
  ...props
}: KeyValueColumnProps) => {
  return (
    <div
      className={cn("flex flex-col gap-2 text-xl text-black", className)}
      {...props}
    >
      <span className="font-medium ">{title}</span>
      <span>{value}</span>
    </div>
  );
};
