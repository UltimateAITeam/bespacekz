import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginSignupHeader = () => {

     // ============= Router hooks ===================

    return (
        <header className="border-b">
            <nav className="container mx-auto py-3 px-3 flex lg:justify-start justify-center">
                <div className="flex flex-row">
                    <Link href={"/"}>
                        <Image
                            src="/bespace/bespace-logo-new.svg"
                            width={150}
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