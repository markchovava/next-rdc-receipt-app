"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { MdBusAlert } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { BsReceiptCutoff } from "react-icons/bs";



export default function ReceiptArea({ authData }) {
  const [auth, setAuth] = useState(authData?.data);


  return (
    <>
    <section className='px-8 pt-8 pb-12 grid grid-cols-3 gap-6'>
        {auth?.role?.level <= 3 && 
        <>
          {/* VERIFY RECEIPT */}
          <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
            <h3 className=' leading-tight text-center'>
              <BsReceiptCutoff className='text-[3rem] text-cyan-600' />
            </h3>
            <p className='text-[1.4rem] font-light'>Receipts List</p>
            <Link href='/admin/receipt/list' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-cyan-600 px-4 py-2 rounded-xl'>
              View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
            </Link>
          </div>
        </>
        }

        {/* USER RECEIPTS */}
        <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
          <h3 className=' leading-tight text-center'>
            <FaUserGroup className='text-[3rem] text-fuchsia-600' />
          </h3>
          <p className='text-[1.4rem] font-light'>User Receipts</p>
          <Link href='/admin/receipt/user' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-fuchsia-600 px-4 py-2 rounded-xl'>
            View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
          </Link>
        </div>

    </section>

    </>
  )
}
