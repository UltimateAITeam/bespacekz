import React from "react";

interface InputProps extends React.ComponentProps<"input"> {}

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={`${className} border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500`}
      {...props}
    />
  );
}

export default Input;
