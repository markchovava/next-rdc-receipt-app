import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import AppInfoView from './_components/AppInfoView'
import { appInfoApiAction } from '@/actions/appInfoActions';
import { profileViewAction } from '@/actions/profileActions';




export default async function page() {
  const [appInfoData, authData] = await Promise.all([appInfoApiAction(), profileViewAction()]);

  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>
        AppInfo </h1>
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
         <li><Link href='/admin/app-info' className='font-semibold'>AppInfo</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <AppInfoView dbData={appInfoData} authData={authData} />


    </div>
    </>
  )
}
