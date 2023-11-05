import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

type FormValues = {
    name: string;
    skills: string;
    portfolio: string;
}

type SignupFormProps = {
    type: "client" | "freelance";
}

function SignupForm({type, ...props}: SignupFormProps) {
    const { handleSubmit, control, register, formState: {errors} } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);

    };

    return (
        <form className="w-72 m-auto flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-white">Name:</label>
            <input
                type="text"
                {...register('name', { required: 'Name is required' })}
            />

            <label className="text-white">Skills:</label>
            <input
                type="text"
                {...register("skills", {required: "Skills are required"})}
            />


            <label className="text-white">Portfolio URL:</label>
            <input
                type="text"
                {...register('portfolio', { required: 'Portfolio URL is required' })}
            />

            <button className="text-white mt-2 border-gray-500 py-2 px-3" type="submit">Submit</button>
        </form>
    );
}

export default SignupForm;