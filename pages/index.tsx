import Image from 'next/image'
import { Inter } from 'next/font/google'

import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return   (<div className='bg-blue-900 w-screen h-screen flex items-center'>
    <div className=' text-center w-full '><button onClick={() => signIn('google')} className='bg-white p-2 rounded-lg px-4'>Login With Google</button></div>
    <div className=' text-center w-full '><button onClick={() => signIn('google')} className='bg-white p-2 rounded-lg px-4'>Make admin</button></div>

   </div>)

  }


  return (
   <div className='bg-blue-900 w-screen h-screen flex items-center'>
    <h1>{session.user?.email}</h1>
   </div>  )
}
