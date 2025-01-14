import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import DistrictView from './_components/DistrictView'
import { districtViewApiAction } from '@/actions/districtActions';




export default async function page({ params: {id} }) {
  const districtData = await districtViewApiAction(id);


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>View District</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/district'>District List</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href={`/admin/district/${id}`} className='font-semibold'>View District</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <DistrictView dbData={districtData} id={id} />


    </div>
    </>
  )
}
