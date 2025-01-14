import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import UserList from './_components/UserList'
import { roleListAllApiAction } from '@/actions/roleAction';
import { userListApiAction } from '@/actions/userActions';
import { districtListAllApiAction } from '@/actions/districtActions';



export default async function page() {
  const [usersData, rolesData, districtsData] = await Promise.all([
    userListApiAction(), 
    roleListAllApiAction(),
    districtListAllApiAction()
  ]);
  

  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>User List</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/user' className='font-semibold'>User List</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <UserList 
        dbData={usersData} 
        rolesData={rolesData} 
        districtsData={districtsData} />


    </div>
    </>
  )
}
