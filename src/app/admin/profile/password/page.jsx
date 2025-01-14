import React from 'react'
import PasswordEdit from './_components/PasswordEdit'
import Link from 'next/link'
import { FaAngleRight } from 'react-icons/fa6'

export default function page() {
  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>Update Password</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/profile'>Profile</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/profile/password' className='font-semibold'>Update Password</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <PasswordEdit />


    </div>
    </>
  )
}
