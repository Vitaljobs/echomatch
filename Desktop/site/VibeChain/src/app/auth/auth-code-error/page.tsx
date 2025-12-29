import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
            <h1 className="text-4xl font-bold mb-4 text-red-500">Authentication Error</h1>
            <p className="text-white/60 mb-8 text-center max-w-md">
                Something went wrong while signing you in. The link might have expired or is invalid.
            </p>
            <Link href="/">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
}
