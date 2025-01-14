import React from 'react'
import MachineEdit from './components/MachineEdit'
import Link from 'next/link'
import { FaAngleRight } from 'react-icons/fa6'
import { machineViewApiAction } from '@/actions/machineActions'





export default async function page({params: {id} }) {
  const machineData = await machineViewApiAction(id)


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>Edit Machine</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='#/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/machine'>Machine List</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href={`/admin/machine/edit/${id}`} className='font-semibold'>Edit Machine</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <MachineEdit id={id} dbData={machineData} />


    </div>
    </>
  )
}
