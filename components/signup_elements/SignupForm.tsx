import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import GoogleButton from "@/components/GoogleButton";
import GitHubButton from "@/components/GitHubButton";
import {ErrorMessage} from "@hookform/error-message";
import Link from "next/link";
import {signIn} from "next-auth/react";

interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    location_city: string;
    password: string;
    role: "client" | "freelance";
}


function SignupForm({type}: {type: "client" | "freelance"}) {

    const [localType, setLocalType] = useState(type);
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { setError, handleSubmit, control, register, formState: {errors, isValid} } = useForm<FormValues>();
    const passwordRegister = register("password", {required: "Password is required"})

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        if (password !== confirmPassword) setError("password", {type: "custom", message: "Passwords doesn't match"})
        if (isValid ) {
            signIn("credentials", {
                email: data.email,
                name: data.first_name,
                last_name: data.last_name,
                password: data.password,
                phone: data.phone,
                location: data.location_city,
                role: data.role,
                redirect: true,
                callbackUrl: "/firststeps",
            }).then((res) => {
                if (res?.status === 401) {
                    setError("password", {type: "custom", message: "Incorrect password"})
                }
            })

        }
    };

    let displayErrors: any = []

    Object.values(errors).forEach((error, index) => {
        if (error.message) displayErrors.push(<li key={index}>{error.message}</li>)
    })

    return (
        <div className="max-w-lg w-2/3 h-2/4 m-auto">
            <div className="h-auto">
                <GoogleButton text="Join with Google" className="mb-4" options={{redirect: true, callbackUrl: "/firststeps"}} />
                <GitHubButton text="Join with GitHub" options={{redirect: true, callbackUrl: "/firststeps"}} />
            </div>

            <div className={`bg-red-500 border-0 rounded text-center py-2 px-1 ${displayErrors.length > 0 ? "block" : "hidden"}`}>
                <ul>
                    {displayErrors}
                </ul>
            </div>

            <form className="h-full m-auto flex flex-col justify-around" onSubmit={handleSubmit(onSubmit)}>

                <div className="flex sm:flex-row justify-between flex-col">
                    <input
                        type="text"
                        className="sm:mb-0 mb-1 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500"
                        placeholder="First name"
                        {...register('first_name', { required: 'Name is required' })}
                    />
                    <input
                        type="text"
                        className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500"
                        placeholder="Last name"
                        {...register("last_name", {required: 'Last name is required'})}
                    />
                </div>

                <input
                    className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500"
                    type="text"
                    placeholder={localType === "freelance" ? "Your work email address" : "Your company email address"}
                    {...register("email", {required: "Email is required"})}
                />

                <input
                    className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500"
                    type="text"
                    placeholder={localType === "freelance" ? "Your phone number" : "Company's phone number"}
                    {...register("phone", {required: "Phone is required"})}
                />


                <div style={{ position: 'relative' }}>
                    <input
                        className={`border-2 w-full ${password === confirmPassword ? 'border-gray-300' : "border-red-500"} text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500`}
                        type={showPassword ? "text" : "password"}
                        placeholder={"Password"}
                        {...passwordRegister}
                        onChange={(e) => {
                            passwordRegister.onChange(e);
                            setPassword(e.currentTarget.value);
                        }}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '👀' : '👁️‍🗨️'}
                    </span>
                </div>

                <div style={{ position: 'relative' }}>
                    <input
                        className={`w-full border-2 ${password === confirmPassword ? 'border-gray-300' : "border-red-500"} text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500`}
                        type={showConfirm ? "text" : "password"}
                        placeholder={"Confirm password"}
                        onChange={(e) => {
                            setConfirmPassword(e.currentTarget.value);
                        }}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                        }}
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? '👀' : '👁️‍🗨️'}
                    </span>
                </div>

                <select
                    className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-gray-500"
                    {...register("location_city", {required: "Location is required"})}
                >
                    <option disabled  selected>Choose a city</option>
                    <option value="ALM">Almaty</option>
                    <option value="AST">Astana</option>
                    <option value="KOS">Kostanay</option>
                </select>

                <input
                    className={"hidden"}
                    value={localType}
                    {...register("role")}
                />

                <button className="bg-gray-500 text-white mt-2 border-gray-500 py-2 px-3" type="submit">Submit</button>
            </form>

            <p className="text-center mt-2">
                {localType === "client" ? "Looking for work?" : "Wanna find developers?"}
                <span
                    className="ml-2 cursor-pointer underline"
                    onClick={() => setLocalType(localType === "client" ? "freelance" : "client")}
                >
                    {localType === "client" ? "Join as Freelancer" : "Join as Client"}
                </span>
            </p>
            <p className="text-center mt-2">
                <span>...or </span>
                <Link href="login" className="cursor-pointer underline">Login</Link>
            </p>
        </div>
    );
}

export default SignupForm;