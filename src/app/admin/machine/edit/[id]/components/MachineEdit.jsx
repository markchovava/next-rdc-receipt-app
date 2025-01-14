"use client";
import { machineUpdateApiAction } from '@/actions/machineActions';
import { userSearchByEmailApiAction } from '@/actions/userActions';
import { reactToastifyDark } from '@/utils/reactToastify';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { toast } from 'react-toastify';



export default function MachineEdit({ dbData, id }) {
    const router = useRouter();
    const [isSubmit, setIsSubmit] = useState(false);
    const [search, setSearch] = useState('');
    const [data, setData] = useState(dbData?.data);
    const [user, setUser] = useState(dbData?.data?.user);
    const [searchResults, setSearchResults] = useState([]);
    const [errMsg, setErrMsg] = useState({});
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    async function getSearchData(input){
      console.log(input)
        setSearch(input);
        if(input) {
            const res = await userSearchByEmailApiAction(input);
            setSearch('');
            if(res?.data?.length > 0) {
                setSearchResults(res?.data);
                return;
            }
        }
        setSearchResults([]);
    }

    async function postData() {
      if(!data.name) {
          const message = 'Name is required.'
          setErrMsg({name: message});
          toast.warn(message, reactToastifyDark);
          setIsSubmit(false)
          return;
      }
      const formData = {
          name: data?.name,
          user_id: user?.id ?? '',
      }
      try{
          const res = await machineUpdateApiAction(formData, id);
          if(res.status == 1) {
              toast.success(res.message, reactToastifyDark);
              setErrMsg({});
              router.push(`/admin/machine/${id}`);
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
        <Link href={`/admin/machine/${id}`} 
        className='px-4 py-2 link__second'>
          View
        </Link>
      </section>
    <section className='mx-auto w-[96%] bg-white drop-shadow-md px-6 pt-8 pb-6'>
      <form action={postData} onSubmit={() => setIsSubmit(true)} method='POST'>
        {/*  */}
        <div className='w-[100%] mb-4'>
          <label className='font-lg font-light block pb-1'>Name:</label>
          <input type='text' name='name' 
            onChange={handleInput}
            value={data?.name}
            placeholder='Enter Name here...' 
              className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
          {errMsg?.name &&
          <div className='text-red-500 text-sm'>{errMsg?.name}</div>
          }
        </div>

        {/* USER EMAIL SEARCH */}
        <div className='w-[100%] mb-4 relative'>
            <p className='mb-2 flex justify-start gap-2'>
                Search By Email: 
                { user?.email &&
                <span className='text-blue-700 font-medium'>{user?.email }</span> }
            </p>
            <input 
                type='text' 
                onChange={(e) => getSearchData(e.target.value)}
                value={search}
                name='search'
                placeholder='Enter the Email here...'
                className='transition-all ease-in-out border border-slate-300 px-3 py-3 hover:border-slate-600 w-[100%] outline-none rounded-xl' />
            {searchResults?.length > 0 &&
                <ul className='w-[100%] bg-slate-50 overflow-hidden rounded-xl absolute z-10 top-[105%]'>
                    {searchResults?.map((i, key) => (
                    <li key={key} 
                        onClick={() => {
                            setUser(i);
                            setSearchResults([]);
                        }}
                        className='flex items-center justify-between duration-200 px-3 py-2 border-b border-white cursor-pointer hover:bg-slate-100 transition-all ease-in-out'>
                        <span>{i?.fname}</span>
                        <span>{i?.email}</span>
                    </li>

                    ))} 
                    
                
                </ul>
            }
        </div>

        
        {/*  */}
        <div className='w-[100%] flex items-center justify-center mb-4'>
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
