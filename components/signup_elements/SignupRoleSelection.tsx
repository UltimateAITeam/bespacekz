import React, {useEffect, useState} from 'react';
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import SignupForm from "@/components/signup_elements/SignupForm";

interface RoleSelectionProps extends React.ComponentProps<"div"> {
    role: "client" | "freelancer";
}

function RoleSelection({role, onClick, className, ...props}: RoleSelectionProps) {


    return (
        <div onClick={onClick} className={`${className} p-2 w-44 cursor-pointer border-2 rounded transition-all border-gray-500 hover:border-purple-500`}>
            {role === "client" ? <p>Я заказчик, ищу людей на проект</p> : <p>Я фрилансер, готов вступить в проект</p>}
        </div>
    );
}

function SignupRoleSelection() {

    const [state, setState] = useState<"Join as client"|"Join as freelancer"|"Create account">("Create account");
    const [showForm, setShowForm] = useState<"client" | "freelance" | null>(null);

    const handleClick = () => {
        setShowForm(state === "Join as client" ? "client" : "freelance")
    }

    if (showForm === "client") {
        return <SignupForm type="client" />
    } else if (showForm === "freelance") {
        return <SignupForm type="freelance" />
    } else {
        return (
            <div className="flex flex-col m-auto sm:rounded items-center border-2 border-gray-500 p-5 w-2/3 max-w-2xl h-80">
                <h2 className={"mb-4 sm:text-3xl text-xl font-bold"}>Join as client or freelancer</h2>
                <div className="flex flex-col sm:flex-row justify-around content-center items-center h-full w-full">
                    <RoleSelection className={`${state === "Join as client" && "border-purple-500"}`} onClick={() => setState("Join as client")} role={"client"} />
                    <RoleSelection className={`${state === "Join as freelancer" && "border-purple-500"}`} onClick={() => setState("Join as freelancer")} role={"freelancer"} />
                </div>
                <div className={"mt-4 w-full"}>
                    <Button className={"w-full"} onClick={handleClick} disabled={state === "Create account"}>{state}</Button>
                </div>
            </div>
        );
    }
}

export default SignupRoleSelection;