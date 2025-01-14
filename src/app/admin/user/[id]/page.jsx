import Link from 'next/link';
import React from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import UserView from './_components/UserView';
import { userViewApiAction } from '@/actions/userActions';




export default async function page({ params: {id} }) {
  const userData = await userViewApiAction(id);


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>View User</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/user'>User List</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href={`/admin/user/${id}`} className='font-semibold'>View User</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <UserView id={id} dbData={userData} />


    </div>
    </>
  )
}
