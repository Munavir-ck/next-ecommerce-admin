import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Log";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [showNav, setShowNav] = useState<boolean>(false);
    const { data: session } = useSession();
    if (!session) {
        return (
            <div className="bg-bgGray w-screen h-screen flex items-center">
                <div className="text-center w-full">
                    <div className="flex items-center justify-center h-screen dark:bg-gray-800">
                        <button
                            onClick={() => signIn("google")}
                            className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                        >
                            <Image
                                height={20}
                                width={20}
                                className="w-6 h-6"
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                loading="lazy"
                                alt="google logo"
                            />
                            <span>Login with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-stone-300 min-h-screen ">
            <div className="block md:hidden flex items-center p-4 ">
                <button onClick={() => setShowNav(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className="flex grow justify-center mr-6">
                    <Logo />
                </div>
            </div>
            <div className="flex">
                <Nav show={showNav} />
                <div className="flex-grow p-4 overflow-hidden min-h-screen ">{children}</div>
            </div>
        </div>
    );
}
