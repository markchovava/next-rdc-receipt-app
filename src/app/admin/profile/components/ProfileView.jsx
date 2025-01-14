"use client";
import { baseURL } from '@/api/baseURL';
import Link from 'next/link';
import React, { useState } from 'react';



export default function ProfileView({dbData}) {
    const [data, setData] = useState(dbData?.data);
    console.log(dbData?.data);

  return (
    <>
    {/* LINK */}
    <section className='mx-auto w-[96%] flex items-center justify-end'>
        <Link href='/admin/profile/edit' 
        className='px-4 my-4 py-2 link__second'>
          Edit
        </Link>
    </section>
    <section className='mx-auto w-[96%] bg-white drop-shadow-md p-6 mb-[4rem]'>
      {/* TITLE */}
      <div className='w-[100%] mb-4'>
          <h3 className='font-light text-[2rem]'>Profile Info</h3>
      </div>
      {/* Image */}
      <div className='w-[100%] mb-6 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Image:</div>
        <div className='md:w-[80%] w-[100%]'>
            <div className='relative w-[10rem] overflow-hidden aspect-square rounded-full text-slate-700 font-light bg-slate-100 drop-shadow-md'>
                <div className='absolute z-10 w-[100%] h-[100%] flex justify-center items-center text-2xl'>
                No Image
                </div>
                <div className='absolute z-20 w-[100%] h-[100%] overflow-hidden'>
                    <img className='w-[100%] h-[100%] object-cover' src={baseURL + data?.image} alt={data?.fname} />
                </div>
            </div>
        </div>
      </div>
      {/* NAME */}
      {data?.fname &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Name:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.fname}</div>
      </div>
      }
      {/* ROLE */}
      {data?.role?.name &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Role:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.role?.name}</div>
      </div>
      }
      {/* ID NUMBER */}
      {data?.id_number &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>ID Number:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.id_number}</div>
      </div>
      }
      {/* VENDOR NO */}
      {data?.vendor_no &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Vendor Number:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.vendor_no}</div>
      </div>
      }
      {/* EMAIL */}
      {data?.email &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Email:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.email}</div>
      </div>
      }
      {/* PHONE */}
      {data?.phone && 
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Phone Number:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.phone}</div>
      </div>
      }
      {/* DISTRICT */}
      {data?.district?.name &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>District:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.district?.name}</div>
      </div>
      }
      {/* AREA */}
      {data?.area &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Area:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.area}</div>
      </div>
      }
      {/* CODE */}
      {data?.code &&
      <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
        <div className='md:w-[20%] w-[100%] font-light'>Code:</div>
        <div className='md:w-[80%] w-[100%]'>{data?.code}</div>
      </div>
      }
   
    </section>
    </>
  )
}
