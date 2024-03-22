import Link from "next/link";

const LoginSignupFooter = () => {
  const current_year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gradient-to-tr from-[#BAE6FD] to-[#CFFAFE]">
      <div className="container mx-auto px-3 py-10 sm:px-7 md:px-5">
        <p className="text-center text-sm font-semibold text-zinc-800">
          &copy; {current_year} Bespace Inc.
          <Link href="#">
            <span className="font-bold text-zinc-700 hover:underline">
              {" "}
              Privacy Policy{" "}
            </span>
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default LoginSignupFooter;
