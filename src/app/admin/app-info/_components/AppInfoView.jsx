"use client";
import { baseURL } from '@/api/baseURL';
import Link from 'next/link'
import React, { useState } from 'react'

export default function AppInfoView({ authData, dbData }) {
  const [auth, setAuth] = useState(authData?.data);
  const [data, setData] = useState(dbData?.data);

  return (
    <>
    {/* LINK */}
    <section className='mx-auto w-[96%]  flex items-center justify-end my-4'>
      { auth?.role?.level <= 2 &&
      <Link href='/admin/app-info/edit' 
        className='px-4 py-2 link__second'>
        Edit
      </Link> 
      }

    </section>
     {data ?
    <section className='mt-3 mb-[4rem] mx-auto w-[96%] bg-white drop-shadow-md px-6 pt-8 pb-4'>
      {/*  */}
      {data?.image &&
        <div className='w-[100%] mb-4 flex md:flex-row flex-col items-start justify-start gap-1'>
          <div className='md:w-[20%] w-[100%] font-light pt-2'>Image:</div>
          <div className='md:w-[80%] w-[100%]'>
            <div className='h-[10rem] aspect-[5/3] bg-slate-50 rounded-2xl overflow-hidden drop-shadow-lg'>
            <img className='w-[100%] h-[100%] object-cover' src={baseURL + data?.image} alt={data?.name} />
            </div>
          </div>
        </div>
      }
      {/* NAME */}
      { data?.name &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Name:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.name}</div>
      </div>
      }
      {/* PHONE */}
      { data?.phone &&
        <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
          <div className='md:w-[20%] w-[100%] font-light'>Phone:</div>
          <div className='md:w-[80%] w-[100%]'>{data?.phone}</div>
        </div>
      }
      {/* ADDRESS */}
      { data?.address &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Address:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.address}</div>
      </div>
      }
      {/* EMAIL */}
      { data?.email &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Email:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.email}</div>
      </div>
      }
      {/* WEBSITE */}
      { data?.website &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Website:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.website}</div>
      </div>
      }
      {/* AUTHOR */}
      {data?.user &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Author:</div>
        <div className='md:w-[80%] w-[100%]'>
          {data?.user?.fname ? data?.user?.fname : data?.user?.email}
        </div>
      </div>
      }
   
   
    </section>
     
    :
    <section className='mt-3 mb-[4rem] py-[4rem] px-6 mx-auto w-[96%] bg-white drop-shadow-md items-center justify-center text-center'>
      <h3 className='font-light text-[2.5rem] text-center'>No Data Available.</h3>
    </section>
    }
    </>
  )
}
