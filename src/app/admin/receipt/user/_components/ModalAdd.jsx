"use client";
import { receiptListApiAction, receiptStoreApiAction } from '@/actions/receiptActions';
import { reactToastifyDark } from '@/utils/reactToastify';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useTransition } from 'react'
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


export default function ModalAdd({isModal, setIsModal, getData, user, machineUser, districts}) {
    const [data, setData] = useState({
        district_id: user?.district_id,
        area: user?.area,
        vendor_no: user?.vendor_no,
        machine_id: user?.machine_id,
        currency: '',
        rate: '',
        amount_paid: '',

    });
    const [errMsg, setErrMsg] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    async function postData() {
        if(!data.district_id) {
            const message = 'District is required.'
            setErrMsg({district_id: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
        if(!data.area) {
            const message = 'Area is required.'
            setErrMsg({area: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
        if(!data.vendor_no) {
            const message = 'Vendor is required.'
            setErrMsg({vendor_no: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
        if(!data.machine_id) {
            const message = 'Machine is required.'
            setErrMsg({machine_id: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
        if(!data.currency) {
            const message = 'Currency is required.'
            setErrMsg({currency: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
        if(!data.rate) {
            const message = 'Rate is required.'
            setErrMsg({rate: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
        if(!data.amount_paid) {
            const message = 'Amount Paid is required.'
            setErrMsg({amount_paid: message});
            toast.warn(message, reactToastifyDark);
            setIsSubmit(false)
            return;
        }
        
        const formData = {
            district_id: data?.district_id,
            area: data?.area,
            vendor_no: data?.vendor_no,
            machine_id: data?.machine_id,
            currency: data?.currency,
            rate: data?.rate,
            amount_paid: data?.amount_paid,
        }
        try{
            const res = await receiptStoreApiAction(formData);
            if(res.status == 1) {
                toast.success(res.message, reactToastifyDark);
                await getData();
                setData({});
                setIsModal(false);
                setErrMsg({});
                setIsSubmit(false)
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
        <section className='mx-auto w-[50%] bg-white text-black p-6 rounded-2xl my-[6rem]'>
            <div className='flex items-center justify-end'>
            <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                <IoClose className='text-2xl' />
            </button>
            </div>
            <h3 className='text-[2rem] font-light text-center mb-3'>Add Receipt</h3>
            <form action={postData} onSubmit={() => setIsSubmit(true)}>
                {/* DISTRICT & AREA */}
                <div className='w-[100%] grid grid-cols-2 gap-3 mb-4'>
                    {/* DISTRICT */}
                    <div className='w-[100%]'>
                        <p className='mb-2'>District:</p>
                        <select 
                        onChange={handleInput}
                        name='district_id'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl'>
                        <option value=''>Select an option</option>
                        {districts && districts?.map((i, key) => (
                            <option key={key} value={i?.id} selected={i?.id == data.district_id && 'selected'}>{i?.name}</option>
                        ))}
                        </select>
                        {errMsg?.district_id &&
                        <div className='text-red-500 text-sm'>{errMsg?.district_id}</div>
                        }
                    </div>
                    {/* AREA */}
                    <div className='w-[100%]'>
                        <p className='mb-2'>Area:</p>
                        <input 
                        type='text' 
                        onChange={handleInput}
                        name='area'
                        value={data?.area}
                        placeholder='Enter the Name here...'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                        {errMsg?.area &&
                        <div className='text-red-500 text-sm'>{errMsg?.area}</div>
                        }
                    </div>
                </div>
                {/* VENDOR & MACHINE */}
                <div className='w-[100%] grid grid-cols-2 gap-3 mb-4'>
                    {/* VENDOR NO */}
                    <div className='w-[100%]'>
                        <p className='mb-2'>Vendor No:</p>
                        <input 
                        type='text' 
                        onChange={handleInput}
                        name='vendor_no'
                        value={data?.vendor_no}
                        placeholder='Enter the Vendor No here...'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                        {errMsg?.vendor_no &&
                        <div className='text-red-500 text-sm'>{errMsg?.vendor_no}</div>
                        }
                    </div>
                    {/* MACHINE ID */}
                    <div className='w-[100%]'>
                        <p className='mb-2'>Machine:</p>
                        <select 
                        onChange={handleInput}
                        name='machine_id'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl'>
                        <option value=''>Select an option</option>
                        {machineUser && machineUser?.map((i, key) => (
                            <option value={i?.id}>{i?.name}</option>
                        ))}
                        </select>
                        {errMsg?.machine_id &&
                        <div className='text-red-500 text-sm'>{errMsg?.machine_id}</div>
                        }
                    </div>
                </div>
                {/* CURRENCY & RATE */}
                <div className='w-[100%] grid grid-cols-2 gap-3 mb-4'>
                     {/* CURRENCY */}
                     <div className='w-[100%]'>
                        <p className='mb-2'>Currency:</p>
                        <select 
                        onChange={handleInput}
                        name='currency'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl'>
                        <option value=''>Select an option</option>
                        <option value='USD'>USD</option>
                        <option value='ZWL'>ZWL</option>
                        </select>
                        {errMsg?.currency &&
                        <div className='text-red-500 text-sm'>{errMsg?.currency}</div>
                        }
                    </div>
                    {/* RATE */}
                    <div className='w-[100%]'>
                        <p className='mb-2'>Rate:</p>
                        <input 
                        type='text' 
                        onChange={handleInput}
                        name='rate'
                        value={data?.rate}
                        placeholder='Enter the Rate here...'
                        className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                        {errMsg?.rate &&
                        <div className='text-red-500 text-sm'>{errMsg?.rate}</div>
                        }
                    </div>
                </div>

                {/* AMOUNT_PAID */}
                <div className='w-[100%] mb-4'>
                    <p className='mb-2'>Amount Paid:</p>
                    <input 
                    type='number' 
                    onChange={handleInput}
                    name='amount_paid'
                    value={data?.amount_paid}
                    placeholder='Enter the Amount Paid here...'
                    className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
                    {errMsg?.amount_paid &&
                    <div className='text-red-500 text-sm'>{errMsg?.amount_paid}</div>
                    }
                </div>
                
                {/* BUTTON */}
                <div className='w-[100%] flex items-center justify-center mt-3'>
                <button type='submit' className='group flex items-center justify-center gap-1 transition-all ease-in-out text-white px-10 py-4 rounded-xl hover:drop-shadow-lg bg-gradient-to-br from-cyan-500 to-blue-700 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-800'>
                    {isSubmit ? 'Processing'
                    : <> Submit 
                    <FaArrowRightLong 
                    className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
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
