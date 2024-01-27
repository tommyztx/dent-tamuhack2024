import Link from "next/link";

export default function Leaderboard() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-6">Leaderboard</h1>
            <div className="space-x-4">
                <Link href="/">
                    <buton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 leading-6 rounded">
                        Home
                    </buton>
                </Link>
            </div>
        </div>
    );
}
