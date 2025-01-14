"use client";
import { receiptVerifyApiAction } from '@/actions/receiptActions';
import { reactToastifyDark } from '@/utils/reactToastify';
import Link from 'next/link';
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { useZxing } from 'react-zxing';


export default function ReceiptVerify() {
  const [isQrScan, setIsQrScan] = useState(true);
  const [data, setData] = useState({   search: '', });
  const [result, setResult] = useState({});
  const [errMsg, setErrMsg] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const handleInput = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const { ref } = useZxing({
    onDecodeResult(result) {
      if(result.getText()){
        setData({...data, search: result.getText()});
        setIsQrScan(true);
      }
    },
    paused: isQrScan
});

  async function getSearchData(){
      if(!data?.search) {
        const message = 'Receipt Entry Number is required.';
        toast.warn(message, reactToastifyDark);
        setErrMsg({search: message});
        setIsSearch(false);
        return;
      }

      try{
        const res = await receiptVerifyApiAction(data?.search);
        if(res?.status == 1) {
          setResult(res)
          setErrMsg({});
          setIsSearch(false);
          toast.success(res?.message, reactToastifyDark);
          return;
        }
        if(res?.status == 0) {
          setResult(res)
          setErrMsg({});
          toast.warn(res?.message, reactToastifyDark);
          setIsSearch(false);
          return;
        }
        } catch (error) {
          console.error(`Error: ${error}`); 
          setIsSearch(false);
      }
      
  }

  
  return (
    <>
    <section className='px-8 pt-8'>
      <div className='pb-[4rem]'>
        {/* STICKER */}
        { result?.status == 1 &&
        <div className='w-[100%] mt-[2rem] p-4 text-lg flex justify-start gap-4 border-r-[1rem] border-blue-300 text-white bg-blue-600'>
          <div className='w-[70%] flex items-center justify-start'>
            { result?.message }
          </div>
          <div className='w-[20%] flex items-center justify-end'>
            <Link 
              href={`/admin/receipt/${result?.data?.id}`} 
              className='border border-slate-100 hover:bg-slate-100 px-3 py-1 rounded-lg hover:text-black duration-150 ease-in-out'>
              View more info
            </Link>
          </div>
          <div className='w-[10%] flex items-center justify-end'>
            <button className='group ' onClick={() => setResult({}) }>
              <IoClose className='text-xl group-hover:scale-125 duration-150 ease-in-out transition-all' />
            </button>
          </div>
        </div> }
        {/*  */}
        { result?.status == 0 &&
        <div className='w-[100%] p-4 text-lg flex justify-start gap-4 border-r-[1rem] border-red-300 text-white bg-red-600'>
          <div className='w-[90%] flex items-center justify-start'>
            {result?.message}
          </div>
         
          <div className='w-[10%] flex items-center justify-end'>
            <button className='group ' onClick={() => setResult({}) }>
              <IoClose className='text-xl group-hover:scale-125 duration-150 ease-in-out transition-all' />
            </button>
          </div>
        </div>  }
        <div className='mt-[4rem]'>
          <div className='pb-4 flex items-center justify-between'>
            <p className='text-[1.7rem] font-light'>Verify Receipt:</p>
            <button onClick={() => setIsQrScan(!isQrScan)} className='py-2 px-4 border ease-in transition-all duration-100 border-green-600 rounded-lg text-green-600 hover:drop-shadow-lg hover:bg-gradient-to-tr hover:from-green-600 hover:to-cyan-700 hover:text-white'>
              {isQrScan ? 'Open QR Code Scanner' : 'Close QR Code Scanner' }
            </button>
          </div>
          {/* SCAN */}
          <div className={`${isQrScan == false ? 'w-[100%] mb-[1rem]' : 'hidden' } flex justify-center items-start`}>
              <div className="w-[20rem] h-[15rem] overflow-hidden rounded-lg">
                  <video ref={ref} className="w-[100%] h-[100%] object-cover bg-white drop-shadow-xl"/>
              </div>
          </div>
          {/*  */}
          <form 
            action={getSearchData} 
            onSubmit={() => setIsSearch(true)} 
            className='w-[100%] flex items-center justify-center'>
              <input 
                  type='text' 
                  name='search'
                  value={data?.search}
                  onChange={handleInput}
                  placeholder='Enter Receipt Number here...'
                  className='w-[90%] h-[3.7rem] outline-none border-l border-y border-slate-400 rounded-l-xl px-4' />
              <button 
                type='submit' 
                className='group w-[10%] px-4 h-[3.7rem] flex justify-center items-center border border-slate-400 border-r rounded-r-xl hover:bg-slate-100'>
                { isSearch ? 
                <span className='animate-pulse w-[15px] h-[15px] rounded-full bg-slate-900'></span>
                : <IoSearch className='text-xl group-hover:scale-125 transition-all ease-in-out duration-200' />
                }
              </button>
          </form>
          { errMsg?.search &&
          <div className='text-sm text-red-500'>
            {errMsg?.search}
          </div> }
        </div>
      </div>
    </section>
    </>
  )
}
