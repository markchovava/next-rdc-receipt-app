"use client";
import Link from 'next/link'
import React, { useState } from 'react'



export default function DistrictView({dbData, id}) {
  const [data, setData] = useState(dbData?.data);

  return (
    <>
      {/* LINK */}
      <section className='mx-auto w-[96%] flex items-center justify-end py-6'>
        <Link href={`/admin/district/edit/${id}`} 
          className='px-4 py-2 link__second'>
          Edit
        </Link>
      </section>
    <section className='mx-auto w-[96%] bg-white drop-shadow-md px-6 py-8 text-lg'>
    {/* NAME */}
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>Name:</div>
      <div className='md:w-[80%] w-[100%]'>{data?.name}</div>
    </div>
    {/* AUTHOR */}
    { data?.user?.email &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>Author:</div>
      <div className='md:w-[80%] w-[100%]'>
        {data?.user?.name ? data?.user?.name : data?.user?.email}</div>
    </div>
    }
  
    </section>
    </>
  )
}
