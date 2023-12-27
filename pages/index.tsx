import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
    const { data: session } = useSession();
    let imageUrl: any = session?.user?.image;
    return (
        <Layout>
            <div className="text-blue-900 flex justify-between ">
                <h2>
                    Hello, <b>{session?.user?.name}</b>
                </h2>
                <div className="flex  gap-1 text-black rounded-lg overflow-hidden">
                    {imageUrl ? <Image width={20} height={20} src={imageUrl} alt="profile" className="w-6 h-6" /> : ""}
                    <span className="px-2">{session?.user?.name}</span>
                </div>
            </div>
            <div className="bg-bgGray mt-4 h-full shadow-2xl rounded-lg p-5 overflow-scroll">
                <h1>haaaaaaaaaai</h1>
            </div>
        </Layout>
    );
}
