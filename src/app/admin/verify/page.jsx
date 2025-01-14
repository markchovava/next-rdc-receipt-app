import React from 'react';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa6';
import VerifyArea from './components/VerifyArea';
import { profileViewAction } from '@/actions/profileActions';



export default async function page() {
  const authData = await profileViewAction();

  return (
    <>
     <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width'>
      {/*  */}
      <section className='px-8 pt-8 pb-3'>
        <h1 className='text-[2.5rem] font-light leading-none'>Verify Receipt</h1>
      </section>
      {/*  */}
      <section className='px-8'>
        <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
          <li><Link href='/' className=''>Home</Link></li>
          <li><FaAngleRight /></li>
          <li><Link href='/admin' className=''>Dashboard</Link></li>
          <li><FaAngleRight /></li>
          <li><Link href='/admin/verify' className='font-semibold'>Verify</Link></li>
        </ul>
      </section>

      
      <VerifyArea authData={authData} />

     </div>
    </>
  )
}
