"use client";
import { roleUpdateApiAction } from '@/actions/roleAction';
import { reactToastifyDark } from '@/utils/reactToastify';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { toast } from 'react-toastify';



export default function RoleEdit({ dbData, id }) {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [inputData, setInputData] = useState(dbData?.data);
    const [errMsg, setErrMsg] = useState({});
    const handleInput = (e) => {
        setInputData({...inputData, [e.target.name]: e.target.value});
    }

  async function postData() {
    if(!inputData.name) {
        const message = 'Name is required.'
        setErrMsg({name: message});
        toast.warn(message, reactToastifyDark);
        setIsSubmit(false);
        return;
    }
    if(!inputData.level) {
        const message = 'Role Level is required.'
        setErrMsg({level: message});
        toast.warn(message, reactToastifyDark);
        setIsSubmit(false);
        return;
    }
    const formData = {
        name: inputData?.name,
        level: inputData?.level,
    }
    try{
        const res = await roleUpdateApiAction(formData, id);
        if(res.status == 1) {
            toast.success(res.message, reactToastifyDark);
            setErrMsg({});
            router.push(`/admin/role/${id}`);
            setIsSubmit(false);
            return;
        }
        setErrMsg({});
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
    }
  }


  return (
    <>
      {/* LINK */}
      <section className='mx-auto w-[96%] flex items-center justify-end py-6'>
        <Link href={`/admin/role/${id}`} 
        className='px-4 py-2 link__second'>
          View
        </Link>
      </section>
    <section className='mx-auto w-[96%] bg-white drop-shadow-md px-6 pt-8 pb-6'>
      <form action={postData} onSubmit={() => setIsSubmit(true)} method='POST'>
        {/*  */}
        <div className='w-[100%] mb-4'>
          <label className='font-lg font-light block pb-1'>Name:</label>
          <input type='text' name='name' 
          onChange={handleInput}
          value={inputData?.name}
          placeholder='Enter Name here...' 
              className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
          {errMsg?.name &&
          <div className='text-red-500 text-sm'>{errMsg?.name}</div>
          }
        </div>

        {/*  */}
        <div className='w-[100%] mb-6'>
          <label className='font-lg font-light block pb-1'>Level:</label>
          <select 
          name='level'
          onChange={handleInput} 
          className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl'>
            <option value=''>Select an option.</option>
            {[...Array(4)].map((i, key) => (
            <option value={key+1} selected={inputData.level == (key+1) && 'selected'}>{key+1}</option>
            ))}
          </select>
          {errMsg?.level &&
          <div className='text-red-500 text-sm'>{errMsg?.level}</div>
          }
        </div>
        {/*  */}
        <div className='w-[100%] flex items-center justify-center mb-4'>
          <button type='submit' className='group flex items-center justify-center gap-2 transition-all ease-in-out text-white px-10 py-4 rounded-xl hover:drop-shadow-lg bg-gradient-to-br from-cyan-500 to-blue-700 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-800'>
            {isSubmit ? 'Processing'
            : <>
            Submit <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
            </>
            }
          </button>
        </div>
      </form>
    </section>
    </>
  )
}
