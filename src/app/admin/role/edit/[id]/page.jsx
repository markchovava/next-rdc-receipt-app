import React from 'react'
import RoleEdit from './components/RoleEdit'
import Link from 'next/link'
import { FaAngleRight } from 'react-icons/fa6'
import { roleViewApiAction } from '@/actions/roleAction'





export default async function page({params: {id} }) {
  const roleData = await roleViewApiAction(id)


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>Edit Role</h1>
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
         <li><Link href='/admin/role'>Role List</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/role/edit/1' className='font-semibold'>Edit Role</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <RoleEdit id={id} dbData={roleData} />


    </div>
    </>
  )
}
