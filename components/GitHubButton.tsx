import React from "react";
import { signIn, SignInOptions } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

interface GitHubButtonProps extends React.ComponentProps<"button"> {
  text: string;
  options?: SignInOptions;
}

function GitHubButton({
  text,
  onClick,
  className,
  options,
  ...props
}: GitHubButtonProps) {
  return (
    <button
      {...props}
      onClick={(e) => signIn("github", options)}
      // bg-black text-white
      className={`${className} hover:bg-gray-100 transition-colors bg-white text-zinc-950 text-xl font-semibold border-2 rounded-lg py-3 px-4 w-full flex items-center justify-center space-x-2`}
    >
      <BsGithub className={"w-8 h-8"} />
      {/* {text} */}
    </button>
  );
}

export default GitHubButton;
