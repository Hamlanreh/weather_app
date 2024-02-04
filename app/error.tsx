'use client';
import Link from "next/link";

type ErrorProps = {
    error: Error,
    reset: () => void
};

export default function Error ({error, reset }: ErrorProps) {
    return (
        <div className="grid h-screen px-4 bg-white dark:bg-black place-content-center">
            <div className="text-center">
                <h1 className="font-black text-gray-200 text-9xl">401</h1>

                <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">Something went wrong!</p>

                <p className="mt-4 text-gray-500 dark:text-gray-200">{error.message || "You must be logged in to access the page"}</p>

                <div className="w-60 mx-auto flex justify-between">
                    <button onClick={() => reset()} className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring">Try Again</button>    
                    <Link href="/" className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring">Go Home</Link>    
                </div>    
            </div>
        </div>
    )
}