"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";

export default function Home() {
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                // icon: HiHome,
                label: "Challenges",
                active: pathname !== "/challenges",
                href: "/challenges",
                color: "red",
            },
            {
                // icon: BiSearch,
                label: "Leaderboard",
                active: pathname === "/leaderboard",
                href: "/leaderboard",
                color: "green",
            },
        ],
        [pathname]
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-6">Welcome to DENT AR App</h1>
            <div className="space-x-4">
                {routes.map((route) => (
                    <Link key={route.label} href={route.href}>
                        <button
                            className={`font-bold inline-block px-6 py-2 leading-6 text-center text-white transition bg-${route.color}-500 rounded shadow ripple hover:shadow-lg hover:bg-${route.color}-700 focus:outline-none`}
                        >
                            {route.label}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}
