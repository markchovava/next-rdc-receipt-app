"use client";
import { profileStoreApiAction } from '@/actions/profileActions';
import { baseURL } from '@/api/baseURL';
import { reactToastifyDark } from '@/utils/reactToastify';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { toast } from 'react-toastify';



export default function ProfileEdit({ dbData, districtsData }) {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState({});
    const [districts, setDistricts] = useState(districtsData?.data);
    const [image, setImage] = useState(dbData?.data?.image && baseURL + dbData?.data?.image);
    const [data, setData] = useState(dbData?.data);
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    async function postData() {
        if(!data?.fname) {
            const message = 'Full Name is required.';
            toast.warn(message, reactToastifyDark);
            setErrMsg({fname: message});
            return;
        }
        if(!data.id_number) {
                    const message = 'ID Number is required.'
                    setErrMsg({id_number: message});
                    toast.warn(message, reactToastifyDark);
                    setIsSubmit(false)
                    return;
        }
        if(!data.email) {
            const message = 'Email is required.'
            setErrMsg({email: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
   
        const formData = new FormData();
        formData.append('fname', data?.fname ?? '');
        formData.append('image', data?.image ?? '');
        formData.append('district_id', data?.district_id);
        formData.append('area', data?.area ?? '');
        formData.append('id_number', data?.id_number ?? '');
        formData.append('vendor_no', data?.vendor_no ?? '');
        formData.append('email', data?.email ?? '');
        try{
            const res = await profileStoreApiAction(formData);
            if(res.status == 1) {
                toast.success(res?.message, reactToastifyDark);
                router.push('/admin/profile');
                setIsSubmit(false);
                return;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            setIsSubmit(false); 
        }

    }




  return (
    <>
    {/* LINK */}
    <section className='mx-auto w-[96%] flex items-center justify-end'>
        <Link href='/admin/profile' 
        className='px-4 my-4 py-2 link__second'>
          View
        </Link>
    </section>

    <section className='mt-3 mx-auto w-[96%] bg-white drop-shadow-md px-6 py-4 mb-[4rem]'>
        <form action={postData} onSubmit={() => setIsSubmit(true)}>
            {/* Image */}
            <div className='w-[100%] mb-6'>
                <label className='font-lg font-light block pb-1'>Image:</label>
                <input type='file' name='image' 
                    onChange={(e) => {
                        setImage(URL.createObjectURL(e.target.files[0]));
                        setData({...data, image: e.target.files[0]});
                    }}
                    className='py-3  w-[50%] outline-none rounded-xl' />
                {image &&
                <div className='relative w-[10rem] aspect-square rounded-full bg-slate-100 drop-shadow-md overflow-hidden'>
                    <div className='w-[100%] h-[100%] absolute z-10 flex items-center justify-center text-2xl text-slate-700'>No Image</div>
                    <img src={image} className='w-[100%] h-[100%] object-cover absolute z-20' />
                </div>
                }

            </div>
            {/* NAME */}
            <div className='w-[100%] mb-4'>
                <p className='mb-2 font-light'>Full Name:</p>
                <input 
                type='text' 
                name='fname'
                onChange={handleInput}
                value={data?.fname}
                placeholder='Enter the Full Name here...'
                className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
            </div>
    
            {/* ID NUMBER & EMAIL */}
            <div className='w-[100%] mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className='w-[100%]'>
                    <p className='mb-2 font-light'>ID Number:</p>
                    <input 
                    type='text' 
                    name='id_number'
                    onChange={handleInput}
                    value={data?.id_number}
                    placeholder='Enter the ID Number here...'
                    className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                </div>
                <div className='w-[100%] font-light'>
                    <p className='mb-2'>Email:</p>
                    <input 
                    type='text' 
                    name='email'
                    value={data?.email}
                    onChange={handleInput}
                    placeholder='Enter the Email here...'
                    className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                </div>
            </div>
            {/* District */}
            <div className='w-[100%] mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className='w-[100%]'>
                    <p className='mb-2 font-light'>District:</p>
                    <select
                        name='district_id'
                        onChange={handleInput}
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl'>
                        <option value=''>Select an option.</option>
                        { districts && districts.map((i, key) => (
                            <option key={key} value={i?.id} selected={i.id == data?.district_id}>{i?.name}</option>
                        ))}
                    </select>
                </div>
                <div className='w-[100%]'>
                    <p className='mb-2 font-light'>Area:</p>
                    <input 
                    type='text' 
                    name='area'
                    value={data?.area}
                    onChange={handleInput}
                    placeholder='Enter Area here...'
                    className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                </div>
            </div>

            {/* BUTTON */}
            <div className='w-[100%] flex items-center justify-center mb-4'>
                <button type='submit' className='group flex items-center justify-center gap-2 transition-all ease-in-out text-white px-10 py-4 rounded-xl hover:drop-shadow-lg bg-gradient-to-br from-cyan-500 to-blue-700 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-800'>
                    {isSubmit ? 'Processing' : 
                    <>
                    Submit <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
                    </>}
                </button>
            </div>
        </form>

    </section>
    </>
  )
}
