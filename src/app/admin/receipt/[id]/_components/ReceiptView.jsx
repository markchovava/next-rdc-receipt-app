"use client";
import Link from 'next/link'
import React, { useState } from 'react'



export default function ReceiptView({authData, dbData, id}) {
  const [data, setData] = useState(dbData?.data);
  const [auth, setAuth] = useState(authData?.data)

  return (
    <>
      {/* LINK */}
      <section className='mx-auto w-[96%] flex items-center justify-end gap-3 py-6'>
        <Link href={`/admin/verify/receipt`} 
          className='text-white rounded-xl px-4 py-2 transition-all ease-in bg-gradient-to-br from-cyan-500 to-blue-700 hover:bg-gradient-to-tr hover:from-cyan-500 hover:to-blue-700'>
          Verify Receipt
        </Link>
        {auth?.role?.level <= 3 &&
        <Link href={`/admin/receipt/edit/${id}`} 
          className='px-4 py-2 link__second'>
          Edit
        </Link>
        }
      </section>
    <section className='mx-auto mb-[4rem] w-[96%] bg-white drop-shadow-md px-6 py-8 text-lg'>
    {/* ENTRY_NO */}
    { data?.entry_no &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        Entry No:</div>
      <div className='md:w-[80%] w-[100%]'>
        { data?.entry_no }
      </div>
    </div>
    }
    {/* DISTRICT */}
    { data?.district?.name &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        District:</div>
      <div className='md:w-[80%] w-[100%]'>
        { data?.district?.name }
      </div>
    </div>
    }
    {/* AREA */}
    { data?.area &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        Area:</div>
      <div className='md:w-[80%] w-[100%]'>
        { data?.area }
      </div>
    </div>
    }
    {/* VENDOR */}
    { data?.vendor_no &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        Vendor ID:</div>
      <div className='md:w-[80%] w-[100%]'>
        { data?.vendor_no}</div>
    </div>
    }
    {/* MACHINE */}
    { data?.machine?.name &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        Machine:</div>
      <div className='md:w-[80%] w-[100%]'>
        { data?.machine?.name}</div>
    </div>
    }
    {/* CURRENCY */}
    { data?.currency &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        Currency:</div>
      <div className='md:w-[80%] w-[100%]'>
        { data?.currency }</div>
    </div>
    }
    {/* RATE */}
    { data?.rate &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        Rate:</div>
      <div className='md:w-[80%] w-[100%]'>
        { '$' + data?.rate }</div>
    </div>
    }
    {/* RATE */}
    { data?.amount_paid &&
    <div className='w-[100%] mb-4 flex md:flex-row flex-col items-center justify-start gap-1'>
      <div className='md:w-[20%] w-[100%] font-light'>
        Amount Paid:</div>
      <div className='md:w-[80%] w-[100%]'>
        { '$' + data?.amount_paid }</div>
    </div>
    }
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
