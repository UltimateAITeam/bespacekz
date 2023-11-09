'use client';
import {FormEvent, Fragment} from "react";
import Link from "next/link";
import {signIn} from "next-auth/react";
import GoogleButton from "@/components/GoogleButton";
import GitHubButton from "@/components/GitHubButton";

export default function LoginPage() {

    const signMeIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        const res = await signIn('credentials', { password: password, email: email, redirect: true, callbackUrl: "/firststeps" })
    }

    return <Fragment>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto"
                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="BeSpace"/>
                <h2 className="dark:text-white mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign
                    in to your account</h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <GitHubButton text={"Sign in with GitHub"} options={{redirect: false, callbackUrl: "/firststeps"}} />
                <GoogleButton text={"Sign in with Google"} options={{redirect: false, callbackUrl: "/firststeps"}} />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={signMeIn} className="space-y-6">
                    <div>
                        <label htmlFor="email"
                               className="dark:text-white block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="dark:text-white block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                                    password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <button type="submit" value="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        in
                    </button>
                </form>
            </div>
        </div>
    </Fragment>
}