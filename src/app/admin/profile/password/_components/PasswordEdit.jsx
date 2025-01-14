"use client";
import { passwordUpdateApiAction } from '@/actions/profileActions';
import { reactToastifyDark } from '@/utils/reactToastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { toast } from 'react-toastify';



export default function PasswordEdit() {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState({});
    const [errMsg, setErrMsg] = useState({});
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    }

    async function postData(){
        if(!data?.password) {
            const message = 'Password is required.';
            toast.warn(message, reactToastifyDark);
            setErrMsg({password: message})
            return;
        }
        if(!data?.password_confirmation) {
            const message = 'Password Confirmation is required.';
            toast.warn(message, reactToastifyDark);
            setErrMsg({password_confirmation: message})
            return;
        }
        if(data?.password != data?.password_confirmation) {
            const message = 'Password do not match.';
            toast.warn(message, reactToastifyDark);
            setErrMsg({password_confirmation: message})
            return;
        }

        const formData = new FormData();
        formData.append('password', data?.password);
        try{ 
            const res = await passwordUpdateApiAction(formData);
            if(res.status == 1) {
                toast.success(res.message, reactToastifyDark);
                setErrMsg({});
                router.push(`/admin/profile`);
                setIsSubmit(false);
                return;
            }
            setErrMsg({});
            toast.warn('Something went wrong, please try again.', reactToastifyDark);
            setIsSubmit(false);
            return
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false);
        }
    }


  return (
    <>
     {/* LINK */}
     <section className='mx-auto w-[96%] flex items-center justify-end py-6'>
        <Link href={`/admin/profile`} 
        className='px-4 py-2 link__second'>
          View
        </Link>
      </section>
    <section className='mx-auto w-[96%] bg-white drop-shadow-md px-6 pt-8 pb-6'>
        <form action={postData} onSubmit={() => setIsSubmit(true)} method='POST'>
        {/*  */}
        <div className='w-[100%] mb-4'>
            <label className='font-lg font-light block pb-1'>Password:</label>
            <input 
                type='password' 
                name='password' 
                onChange={handleInput}
                value={data?.password}
                placeholder='Enter Password here...' 
                className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
            {errMsg?.password &&
            <div className='text-red-500 text-sm'>{errMsg?.password}</div>
            }
        </div>
        {/*  */}
        <div className='w-[100%] mb-4'>
            <label className='font-lg font-light block pb-1'>Confirm Password:</label>
            <input 
                type='password' 
                name='password_confirmation' 
                onChange={handleInput}
                value={data?.password_confirmation}
                placeholder='Enter Password Confirmation here...' 
                className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
            {errMsg?.password_confirmation &&
            <div className='text-red-500 text-sm'>{errMsg?.password_confirmation}</div>
            }
        </div>
        {/*  */}
        <div className='w-[100%] flex items-center justify-center mt-2 mb-4'>
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
