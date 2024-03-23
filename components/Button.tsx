import React from "react";

function Button({
  children,
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={`${className} border-25 rounded-2xl bg-purple-500 px-2 py-1 transition-all hover:bg-purple-600 disabled:bg-gray-500 disabled:hover:bg-gray-500`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
