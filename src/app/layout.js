import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const ArComponent = dynamic(() => import("./components/ArComponent"), {
    ssr: false,
});

export const metadata = {
    title: "DENT TAMUHack 2024",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
