"use client";
import { receiptUpdateApiAction } from '@/actions/receiptActions';
import { reactToastifyDark } from '@/utils/reactToastify';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { toast } from 'react-toastify';



export default function ReceiptEdit({ dbData, id, districtsData, machinesUserData }) {
    const router = useRouter();
    const [districts, setDistricts] = useState(districtsData?.data)
    const [machinesUser, setMachinesUser] = useState(machinesUserData?.data)
    const [isSubmit, setIsSubmit] = useState(false);
    const [data, setData] = useState(dbData?.data);
    const [errMsg, setErrMsg] = useState({});
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
        const res = await receiptUpdateApiAction(formData, id);
        if(res.status == 1) {
            toast.success(res.message, reactToastifyDark);
            setErrMsg({});
            router.push(`/admin/receipt/${id}`);
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
        <Link href={`/admin/receipt/${id}`} 
        className='px-4 py-2 link__second'>
          View
        </Link>
      </section>
    <section className='mx-auto w-[96%] bg-white drop-shadow-md px-6 pt-8 pb-6'>
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
                    {machinesUser && machinesUser?.map((i, key) => (
                        <option value={i?.id} selected={i?.id == data?.machine_id && 'selected'}>{i?.name}</option>
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
                    <option value='USD' selected={data?.currency == 'USD' && 'selected'}>USD</option>
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
    </>
  )
}
