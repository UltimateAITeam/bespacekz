'use client';
import React from 'react';
import {useSession} from "next-auth/react";
import Spinner from "@/components/Spinner";
import {redirect} from "next/navigation";

function Layout({children}: {children: React.ReactNode}) {

    const session = useSession();
    if (session.status === "loading") {
        return <Spinner width="w-20" height="w-20"/>
    } else if (session.data?.user.role) {
        return redirect("/firststeps")
    } else {
        return children
    }
}

export default Layout;