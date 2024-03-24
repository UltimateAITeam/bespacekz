import React from 'react';

function Button({children, className, ...props}: React.ComponentProps<"button">) {
    return (
        <button className={`${className} disabled:bg-gray-500 disabled:hover:bg-gray-500 border-25 rounded-2xl px-2 py-1 transition-all hover:bg-purple-600 bg-purple-500`} {...props}>
            {children}
        </button>
    );
}

export default Button;