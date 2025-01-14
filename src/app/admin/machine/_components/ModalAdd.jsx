"use client";
import { machineStoreApiAction } from '@/actions/machineActions';
import { userSearchByEmailApiAction } from '@/actions/userActions';
import { reactToastifyDark } from '@/utils/reactToastify';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
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


export default function ModalAdd({isModal, setIsModal, getData}) {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [data, setData] = useState({});
    const [errMsg, setErrMsg] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleInput = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    async function getSearchData(input){
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
            const res = await machineStoreApiAction(formData);
            if(res.status == 1) {
                toast.success(res.message, reactToastifyDark);
                await getData();
                setData({});
                setUser(null);
                setErrMsg({});
                setIsModal(false);
                setIsSubmit(false)
                return;
            }
            } catch (error) {
                console.error(`Error: ${error}`);
                setIsSubmit(false);
        }
    }


    useEffect(() => { search && getSearchData(); }, [search])

  


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
        className='w-[100vw] h-[100vh] fixed top-0 left-0 z-50 overflow-y-auto'>
        <div className='absolute z-0 top-0 left-0 w-[100%] h-[100%] bg-black opacity-40'></div>
        <div className='w-[100%] h-[100%] absolute z-10 py-[6rem]'>
        <section className='mx-auto w-[50%] bg-white text-black p-6 rounded-2xl'>
            <div className='flex items-center justify-end'>
            <button onClick={() => setIsModal(false)} className='hover:text-red-600 transition-all ease-in-out duration-200'>
                <IoClose className='text-2xl' />
            </button>
            </div>
            <h3 className='text-[2rem] font-light text-center mb-3'>Add Machine</h3>
            <form action={postData} onSubmit={() => setIsSubmit(true)}>
                {/* NAME */}
                <div className='w-[100%] mb-4'>
                    <p className='mb-2'>Name:</p>
                    <input 
                    type='text' 
                    onChange={handleInput}
                    name='name'
                    placeholder='Enter the Name here...'
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
               
                {/* BUTTON */}
                <div className='w-[100%] flex items-center justify-center'>
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
