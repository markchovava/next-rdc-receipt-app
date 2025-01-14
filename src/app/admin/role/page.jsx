import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import RoleList from './_components/RoleList'
import { roleListApiAction } from '@/actions/roleAction'
import { profileViewAction } from '@/actions/profileActions'




export default async function page() {
  const [authData, rolesData] = await Promise.all([ profileViewAction(), roleListApiAction() ]);


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>Role List</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/setting'>Settings</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/role' className='font-semibold'>Role List</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <RoleList authData={authData} dbData={rolesData} />


    </div>
    </>
  )
}
