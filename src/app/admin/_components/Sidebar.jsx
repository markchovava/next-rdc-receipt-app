
import React from 'react'
import SidebarNav from './SidebarNav'
import Link from 'next/link'
import Image from 'next/image'
import { profileViewAction } from '@/actions/profileActions';



export default async function Sidebar() {
  const authData = await Promise.all([ profileViewAction() ]);
  
  return (
    <div className='text-white h-[100vh] overflow-auto scroll__width'>
        <section className='w-[100%] py-6 border-b border-slate-50'>
          <Link href='/admin'>
            <h3 className='px-8 flex flex-col justify-center items-center gap-2 font-bold text-center text-[2rem] leading-none'>
                <Image 
                  width={300}
                  height={120} 
                  src='/img/rdc_Logo.png' 
                  objectFit='fit' 
                  alt='Logo'
                  layout='responsive' />
            </h3>
          </Link>
        </section>
        <SidebarNav authData={authData} />
    </div>
  )
}
