import { SignIn } from "@clerk/nextjs";

export default function page() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <SignIn />
        </div>
    );
}
