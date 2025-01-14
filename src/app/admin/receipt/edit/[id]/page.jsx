import React from 'react'
import ReceiptEdit from './components/ReceiptEdit'
import Link from 'next/link'
import { FaAngleRight } from 'react-icons/fa6'
import { receiptViewApiAction } from '@/actions/receiptActions'
import { districtListAllApiAction } from '@/actions/districtActions'
import { machineListByUserApiAction } from '@/actions/machineActions'





export default async function page({params: {id} }) {
  const [receiptData, districtsData, machinesUserData] = await Promise.all([
    receiptViewApiAction(id), 
    districtListAllApiAction(),
    machineListByUserApiAction()
  ]);


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>Edit Receipt</h1>
     </section>
     {/*  */}
     <section className='mx-auto w-[96%]'>
       <ul className='text-sm flex items-center justify-end gap-2 border-y border-slate-200'>
         <li><Link href='/' className=''>Home</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin'>Dashboard</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href='/admin/receipt'>Receipts</Link></li>
         <li><FaAngleRight /></li>
         <li><Link href={`/admin/receipt/edit/${id}`} className='font-semibold'>Edit Receipt</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <ReceiptEdit 
        id={id} 
        dbData={receiptData}
        districtsData={districtsData} 
        machinesUserData={machinesUserData} />


    </div>
    </>
  )
}
