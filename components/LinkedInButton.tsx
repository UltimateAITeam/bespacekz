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
                className={`${className} hover:bg-gray-100 transition-colors bg-white text-zinc-950 text-xl font-semibold border-2 rounded-lg py-3 px-4 w-full flex items-center justify-center space-x-2`}>
            {/* <BsLinkedin className="w-7 h-7 mr-2" /> */}
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
                <path fill="#0288d1" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M14 19H18V34H14zM15.988 17h-.022C14.772 17 14 16.11 14 14.999 14 13.864 14.796 13 16.011 13c1.217 0 1.966.864 1.989 1.999C18 16.11 17.228 17 15.988 17zM35 24.5c0-3.038-2.462-5.5-5.5-5.5-1.862 0-3.505.928-4.5 2.344V19h-4v15h4v-8c0-1.657 1.343-3 3-3s3 1.343 3 3v8h4C35 34 35 24.921 35 24.5z"></path>
            </svg>
            {/* {text} */}
        </button>
    );
}

export default GitHubButton;