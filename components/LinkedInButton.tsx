import React from 'react';
import {signIn, SignInOptions} from "next-auth/react";
import {BsLinkedin} from "react-icons/bs";

interface LinkedInButtonProps extends React.ComponentProps<"button">{
    text: string;
    options?: SignInOptions;
}

function GitHubButton({text, onClick, className, options, ...props}: LinkedInButtonProps) {
    return (
        <button {...props} onClick={e => signIn("linkedin", options)}
                className={`${className} bg-[#0077b5] rounded-md py-2 px-4 mb-4 w-full flex items-center justify-center space-x-2`}>
            <BsLinkedin className="w-7 h-7 mr-2" />
            {text}
        </button>
    );
}

export default GitHubButton;