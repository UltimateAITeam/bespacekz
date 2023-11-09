'use client';

import React, {ChangeEvent, useState} from 'react';
import {useForm, SubmitHandler} from "react-hook-form";
import Input from "@/components/ui/Input";
import {useSession} from "next-auth/react";
import FreelancerForm from "@/components/signup_elements/FreelancerForm";

function FirstStepsForms() {


    const session = useSession();

    const role = session.data?.user.role?.toString();
    return role === "FREELANCER" && <FreelancerForm />
 }

export default FirstStepsForms;