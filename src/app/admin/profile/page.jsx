import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import ProfileView from './components/ProfileView'
import { profileViewAction } from '@/actions/profileActions';



export default async function page() {
    const profileData = await profileViewAction();


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>View Profile</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/profile' className='font-semibold'>View Profile</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <ProfileView dbData={profileData} />


    </div>
    </>
  )
}
