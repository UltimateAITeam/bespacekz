import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginSignupHeader = () => {

     // ============= Router hooks ===================

    return (
        <header className="border-b">
            <nav className="container mx-auto py-3 px-3 flex lg:justify-start justify-center">
                <div>
                    <Link href={"/"}>
                        <Image
                            src="/bespace/bespace-v3.png"
                            width={170}
                            height={50}
                            alt="logo"
                            className="cursor-pointer"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default LoginSignupHeader;