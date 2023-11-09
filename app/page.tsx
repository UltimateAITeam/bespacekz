'use client';
import {signOut, useSession} from "next-auth/react";

export default function HomePage() {
    const session = useSession();
    return (
        <div className="flex flex-col m-auto items-center">
            <pre>{JSON.stringify(session.data)}</pre>
            <a href="/signup">GET STARTED</a>
            <button onClick={() => signOut({redirect: false})}>LOG OUT</button>
        </div>
    )
}