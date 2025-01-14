import Link from 'next/link'
import React from 'react'
import { FaAngleRight } from 'react-icons/fa6'
import ReceiptList from './_components/ReceiptList'
import { receiptListApiAction, receiptListByUserApiAction } from '@/actions/receiptActions'
import { profileViewAction } from '@/actions/profileActions'
import { machineListByUserApiAction } from '@/actions/machineActions'
import { districtListAllApiAction } from '@/actions/districtActions'




export default async function page() {
  const [
    receiptsData, userData, machineUserData, districtsData] = await Promise.all([
    receiptListByUserApiAction(), 
    profileViewAction(),
    machineListByUserApiAction(), 
    districtListAllApiAction()
  ]);


  return (
    <>
    <div className='h-[calc(100vh-3.5rem)] overflow-auto scroll__width bg-slate-50'>
     {/*  */}
     <section className='mx-auto w-[96%] pt-8 pb-3'>
       <h1 className='text-[2.5rem] font-light leading-none'>Receipt List</h1>
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
         <li><Link href='/admin/receipt/user' className='font-semibold'>Receipt List</Link></li>
       </ul>
     </section>

     {/* LIST */}
     <ReceiptList 
        dbData={receiptsData} 
        userData={userData} 
        machineUserData={machineUserData} 
        districtsData={districtsData} 
      />


    </div>
    </>
  )
}
