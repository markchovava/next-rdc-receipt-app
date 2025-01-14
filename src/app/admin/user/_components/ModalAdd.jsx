"use client";
import { userStoreApiAction } from '@/actions/userActions';
import { reactToastifyDark } from '@/utils/reactToastify';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';


const contentVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1,
        transition: {
            type: 'spring',
            duration: 1, }},
}


export default function ModalAdd({isModal, setIsModal, roles, getData, districts}) {
    const [isSubmit, setIsSubmit] = useState(false);
    const [image, setImage] = useState();
    const [errMsg, setErrMsg] = useState({});
    const [data, setData] = useState({});
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    async function postData() {
        if(!data.fname) {
            const message = 'Full Name is required.'
            setErrMsg({fname: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
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
        formData.append('image', data?.image)
        formData.append('email', data?.email)
        formData.append('fname', data?.fname)
        formData.append('district_id', data?.district_id)
        formData.append('area', data?.area)
        formData.append('role_id', data?.role_id)
        formData.append('id_number', data?.id_number);

        try{
            const res = await userStoreApiAction(formData);
            console.log('res')
            console.log(res)
            if(res.status == 1) {
                toast.success(res.message, reactToastifyDark);
                await getData();
                setData({});
                setIsModal(false);
                setErrMsg({});
                setIsSubmit(false)
                return;
            }
            if(res?.status == 0){
                toast.success(res?.message, reactToastifyDark);
                setErrMsg({email: res?.message});
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
    {/* MODAL */}
    <AnimatePresence>
        {isModal && 
        <motion.section
        variants={contentVariant}
        initial='hidden'
        animate='visible'
        exit='hidden'
        className='w-[100vw] h-[100vh] fixed top-0 left-0 z-50 overflow-hidden'>
        <div className='absolute z-0 top-0 left-0 w-[100%] h-[100%] bg-black opacity-40'></div>
        <div className='w-[100%] h-[100%] absolute z-10 overflow-auto scroll__width py-[6rem]'>
         {/*  */}   
        <section className='mx-auto w-[70%] h-auto bg-white text-black p-6 rounded-2xl'>
            <div className='flex items-center justify-end'>
                <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                    <IoClose className='text-2xl' />
                </button>
            </div>
            <h3 className='text-[2.2rem] font-light text-center mb-3'>Add User</h3>
            <form action={postData} onSubmit={() => setIsSubmit(true)} >
                {/* Image */}
                <div className='w-[100%] mb-4'>
                    <label className='font-lg font-light block pb-1'>Image:</label>
                    <input type='file' name='image' 
                        onChange={(e) => {
                            setImage(URL.createObjectURL(e.target.files[0]));
                            setData({...data, image: e.target.files[0]})
                        }}
                        className='py-3  w-[50%] outline-none rounded-xl' />
                    {image &&
                    <div className='h-[10rem] aspect-[1/1] rounded-full bg-slate-50 drop-shadow-lg overflow-hidden'>
                        <img src={image} className='w-[100%] h-[100%] object-cover' />
                    </div>
                    }
                </div>
                {/* NAME & ID NUMBER */}
                <div className='w-[100%] mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-[100%]'>
                        <p className='mb-2 font-light'>Full Name:</p>
                        <input 
                        type='text' 
                        name='fname'
                        onChange={handleInput}
                        value={data?.fname}
                        placeholder='Enter the Full Name here...'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                        {errMsg?.fname && 
                            <p className='text-sm text-red-600'>{errMsg?.fname}
                        </p>}
                    </div>
                    <div className='w-[100%] font-light'>
                        <p className='mb-2'>ID Number:</p>
                        <input 
                        type='text'
                        onChange={handleInput} 
                        name='id_number'
                        value={data?.id_number}
                        placeholder='Enter the ID Number here...'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                        {errMsg?.id_number && 
                            <p className='text-sm text-red-600'>{errMsg?.id_number}
                        </p>}
                    </div>
                </div>
                {/* EMAIL */}
                <div className='w-[100%] mb-4'>
                    <p className='mb-2 font-light'>Email:</p>
                    <input 
                    type='text' 
                    name='email'
                    onChange={handleInput}
                    value={data?.email}
                    placeholder='Enter the Email here...'
                    className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                    {errMsg?.email && 
                        <p className='text-sm text-red-600'>{errMsg?.email}
                    </p>}
                </div>
                {/* DISTRICT & AREA */}
                <div className='w-[100%] mb-4 grid lg:grid-cols-2 grid-cols-1 gap-4'>
                    <div className='w-[100%]'>
                        <p className='mb-2 font-light'>District:</p>
                        <select 
                            name='district_id'
                            onChange={handleInput}
                            className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl'>
                            <option value=''>Select an option.</option>
                            { districts && districts.map((i, key) => (
                                <option key={key} value={i?.id}>{i?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-[100%]'>
                        <p className='mb-2 font-light'>Area:</p>
                        <input 
                            type='text' 
                            name='area'
                            onChange={handleInput}
                            value={data?.area}
                            placeholder='Enter Address here...'
                            className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                    </div>
                </div>
                {/* ROLE */}
                {roles &&
                <div className='w-[100%] mb-8'>
                    <p className='mb-2 font-light'>Role:</p>
                    <select 
                    name='role_id' 
                    onChange={handleInput}
                    className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl'>
                        <option value=''>Select an option.</option>
                        {roles?.map((i, key) => (
                        <option key={key} value={i.id}>{i.name}</option>
                        ))}
                    </select>
                </div>
                }
                {/* BUTTON */}
                <div className='w-[100%] flex items-center justify-center mb-4'>
                    <button type='submit' className='group flex items-center justify-center gap-1 transition-all ease-in-out text-white px-10 py-4 rounded-xl hover:drop-shadow-lg bg-gradient-to-br from-cyan-500 to-blue-700 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-800'>
                        {isSubmit ? 'Processing' : 
                        <>
                        Submit <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
                        </>
                        }
                    </button>
                </div>
            </form>

        </section>
        </div>
        </motion.section>
        }
    </AnimatePresence>
    </>
  )
}
