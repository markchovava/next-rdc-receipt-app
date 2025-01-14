"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { FaAngleRight, FaArrowRightLong } from 'react-icons/fa6'
import { IoReceipt } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { TbEngine } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { PiMapPinAreaFill } from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";


/* 
1 = Admin
2 = Admin
3 = Operator
4 = Vendor
*/



export default function MainArea({ authData }) {
  const [auth, setAuth] = useState(authData?.data);


  return (
    <>
    
    <section className='px-8 pt-8 pb-12 grid grid-cols-3 gap-6'>
        
        {auth?.role?.level <= 2 &&
        <>
          {/* USERS */}
          <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
            <h3 className=' leading-tight text-center'>
              <ImUsers className='text-[3rem] text-cyan-600' />
            </h3>
            <p className='text-[1.4rem] font-light'>Users</p>
            <Link href='/admin/user' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-cyan-600 px-4 py-2 rounded-xl'>
              View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
            </Link>
          </div>
        </>}

        {/* RECEIPTS */}
        <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
          <h3 className=' leading-tight text-center'>
            <IoReceipt className='text-[3rem] text-red-600' />
          </h3>
          <p className='text-[1.4rem] font-light'>Receipts</p>
          <Link href='/admin/receipt' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-red-600 px-4 py-2 rounded-xl'>
            View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
          </Link>
        </div>

        {auth?.role?.level <= 2 && 
        <>
        {/* MACHINES */}
        <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
          <h3 className=' leading-tight text-center'>
            <TbEngine className='text-[3rem] text-green-600' />
          </h3>
          <p className='text-[1.4rem] font-light'>Machines</p>
          <Link href='/admin/machine' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-green-600 px-4 py-2 rounded-xl'>
            View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
          </Link>
        </div>
        </>
        }

        {auth?.role?.level <= 3 && 
        <>
          {/* DISTRICTS */}
          <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
            <h3 className=' leading-tight text-center'>
              <PiMapPinAreaFill className='text-[3rem] text-orange-600' />
            </h3>
            <p className='text-[1.4rem] font-light'>Districts</p>
            <Link href='/admin/district' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-orange-600 px-4 py-2 rounded-xl'>
              View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
            </Link>
          </div>
        </> }

        {/* VERIFY */}
        <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
          <h3 className=' leading-tight text-center'>
            <GiConfirmed className='text-[3rem] text-teal-600' />
          </h3>
          <p className='text-[1.4rem] font-light'>Verify</p>
          <Link href='/admin/verify' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-teal-600 px-4 py-2 rounded-xl'>
            View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
          </Link>
        </div>

        {/* SETTINGS */}
        <div className='border border-slate-300 transition-all ease-in-out duration-200 hover:drop-shadow-md bg-white py-8 px-4 flex flex-col items-center justify-center gap-3'>
          <h3 className=' leading-tight text-center'>
            <IoSettings className='text-[3rem] text-slate-600' />
          </h3>
          <p className='text-[1.4rem] font-light'>Settings</p>
          <Link href='/admin/setting' className='font-light text-[1.2rem] group flex items-center justify-center gap-2 transition-all ease-in-out duration-150 text-slate-600 px-4 py-2 rounded-xl'>
            View More <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
          </Link>
        </div>

       
        
       
    </section>

    </>
  )
}
