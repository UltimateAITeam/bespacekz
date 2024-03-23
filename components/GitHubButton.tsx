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
      className={`${className} flex w-full items-center justify-center space-x-2 rounded-lg border-2 bg-white px-4 py-3 text-xl font-semibold text-zinc-950 transition-colors hover:bg-gray-100`}
    >
      <BsGithub className={"h-8 w-8"} />
      {/* {text} */}
    </button>
  );
}

export default GitHubButton;
