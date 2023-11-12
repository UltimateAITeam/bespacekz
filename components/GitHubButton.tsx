import React from 'react';
import {signIn, SignInOptions} from "next-auth/react";
import {BsGithub} from "react-icons/bs";

interface GitHubButtonProps extends React.ComponentProps<"button">{
    text: string;
    options?: SignInOptions;
}

function GitHubButton({text, onClick, className, options, ...props}: GitHubButtonProps) {
    return (
        <button {...props} onClick={e => signIn("github", options)}
                className={`${className} bg-black text-white rounded-md py-2 px-4 mb-4 w-full flex items-center justify-center space-x-2`}>
            <BsGithub className={"w-6 h-6 mr-2"} />
            {text}
        </button>
    );
}

export default GitHubButton;