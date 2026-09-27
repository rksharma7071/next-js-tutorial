"use client";

import { usePathname } from "next/navigation";

export default function About(){
    const pathname = usePathname();
    return (
        <div>
            <h1>pathname: {pathname}</h1>
            <h1>Admin About Us Page</h1>
        </div>
    )
}
