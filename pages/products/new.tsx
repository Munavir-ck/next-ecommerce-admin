import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";
import {useSession} from "next-auth/react";

export default function NewProduct() {
  const {data: session} = useSession();
  return (
    <Layout>
        <div className="text-blue-900 flex justify-between ">
      <h2>
        Hello, <b>{session?.user?.name}</b>
      </h2>
      <div className="flex  gap-1 text-black rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
    
    </div>
    <div className="bg-bgGray shadow-2xl  mt-4 rounded-lg h-full p-10">
      <ProductForm />
      </div>
    </Layout>
  );
}