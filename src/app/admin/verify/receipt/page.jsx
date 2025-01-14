import React from 'react';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa6';
import ReceiptVerify from './components/ReceiptVerify';



export default async function page() {


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
          <li><Link href='/admin/verify' className=''>Verify</Link></li>
          <li><FaAngleRight /></li>
          <li><Link href='/admin/verify/receipt' className='font-semibold'>Verify Receipt</Link></li>
        </ul>
      </section>

      
      <ReceiptVerify />


     </div>
    </>
  )
}
