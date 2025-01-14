"use client";
import Link from 'next/link'
import React, { useEffect, useState, useTransition } from 'react'
import { FaArrowLeftLong, FaArrowRightLong, FaEye } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5';
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import ModalAdd from './ModalAdd';
import { AdminContextState } from '@/context/AdminContext';
import { roleDeleteApiAction, roleListApiAction, rolePaginationApiAction, roleSearchApiAction } from '@/actions/roleAction';
import { toast } from 'react-toastify';
import { reactToastifyDark } from '@/utils/reactToastify';
import Loader from '@/components/Loader';



export default function RoleList({ authData, dbData }) {
    const [auth, setAuth] = useState(authData?.data);
    const { roleState, roleDispatch } = AdminContextState();
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState('');
    const [isModal, setIsModal] = useState('');

    useEffect(() => {
        roleDispatch({type: 'ADD_DATA', payload: {
            items: dbData?.data,
            prevURL: dbData?.links.prev,
            nextURL: dbData?.links.next,
        }});
    }, []);

    async function paginateHandler(url) {
        try{
            const res = await rolePaginationApiAction(url)
            roleDispatch({type: 'ADD_DATA', payload: {
                items: res?.data,
                prevURL: res?.links.prev,
                nextURL: res?.links.next,
            }});
        } catch (error) {
           console.error(`Error: ${error}`)
        } 
    }

    async function getSearchData() {
        if(!search) {
            await getData();
            return;
          }
          try{
            const res = await roleSearchApiAction(search);
            startTransition(() => res);
            roleDispatch({type: 'ADD_DATA', payload: {
                items: res?.data,
                prevURL: res?.links.prev,
                nextURL: res?.links.next,
            }});
            } catch (error) {
              console.error(`Error: ${error}`); 
          }
    }

    async function getData() {
        try{
            const res = await roleListApiAction();
            roleDispatch({type: 'ADD_DATA', payload: {
                items: res?.data,
                prevURL: res?.links.prev,
                nextURL: res?.links.next,
            }});
          
            } catch (error) {
                console.error(`Error: ${error}`); 
          }
    }

    async function deleteData(id) {
        try{
            const res = await roleDeleteApiAction(id);
            if(res.status == 1) {
                await getData();
                toast.success(res?.message, reactToastifyDark);
                return;
            }
            } catch (error) {
                console.error(`Error: ${error}`); 
        }
    }


    if(!roleState.items) { return <Loader /> }


  return (
    <>

    {/* TOP */}
    <section className='w-[100%] mt-6 bg-white drop-shadow-md '>
        {/* SEARCH */}
        <div className='mx-auto w-[96%] flex items-center justify-between gap-4 py-3'>
          <form action={getSearchData} 
            className='lg:w-[40%] flex items-center justify-start transition-all ease-in-out border border-slate-200 hover:border-slate-500 w-[100%] outline-none rounded-xl'>
            <input type='text' 
                name='search'
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className='w-[80%] px-3 py-3 rounded-l-xl outline-none'
                placeholder='Enter Name here...' />
            <button type='submit' 
              className='p-3 w-[20%] h-[100%] rounded-r-xl transition-all ease-in-out flex justify-center items-center border-l border-slate-200 hover:border-l hover:border-slate-500'>
              {isPending 
              ? <span className='animate-pulse w-[15px] h-[15px] rounded-full bg-slate-900'></span>
              : <IoSearch className='text-lg' />
              }
            </button>
          </form>
          <div className='flex items-center justify-end gap-3'>
            { auth?.role?.level <= 2 &&
            <>
            <button 
                onClick={() => setIsModal(true)} 
                className='py-3 px-5 rounded-xl text-white transition-all ease-in-out duration-200 bg-gradient-to-br from-cyan-500 to-blue-600 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-700 hover:drop-shadow-md'>
                Add
            </button>
            </>}

          </div>
        </div>
    </section>
    {/* MAIN CONTENT */}
    <section className="w-[100%] lg:overflow-hidden overflow-scroll">
        <section className='lg:w-[100%] w-[60rem]'>
        {/* HEADER */}
        <div className='mx-auto w-[96%] text-lg py-2 flex items-center justify-start font-bold bg-slate-200 '>
            <div className='w-[40%] border-r border-white px-3 py-2'>NAME</div>
            <div className='w-[20%] border-r border-white px-3 py-2'>LEVEL</div>
            <div className='w-[30%] border-r border-white px-3 py-2'>AUTHOR</div>
            <div className='w-[10%] px-3 py-2'>ACTION</div>
        </div>
        {/* DETAILS */}
        { roleState?.items?.length > 0 ?
          roleState.items.map((i, key) => (
            <div key={key} className='mx-auto w-[96%] bg-white py-2 flex items-center justify-start border border-slate-300 '>
                <div className='w-[40%] border-r border-slate-300 px-3 py-1'>{i.name}</div>
                <div className='w-[20%] border-r border-slate-300 px-3 py-1'>{i.level}</div>
                <div className='w-[30%] border-r border-slate-300 px-3 py-1'>
                    {i?.user?.name ? i?.user?.name : i?.user?.email}
                </div>
                <div className='w-[10%] px-3 py-1 text-xl flex items-center justify-center gap-2'>
                    <Link title='View' href={`/admin/role/${i?.id}`}> 
                    <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                    </Link>
                    { auth?.role?.level <= 2 &&
                    <>
                        <Link title='Edit' href={`/admin/role/edit/${i?.id}`}> 
                            <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                        </Link>  
                        <button title='Delete'
                            onClick={() => deleteData(i.id)}> 
                            <MdDeleteForever 
                            className='hover:text-red-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                        </button>
                    </>
                    }
                    
                </div>
            </div>
        ))
        : 
        <div className='mx-auto w-[96%] bg-white py-8 flex items-center justify-center text-[2rem] font-light'>
            No Data Available.
        </div>
        }
        </section>
    </section>
    {/* PAGINATION */}
    <section className='mx-8 pt-8 pb-12 flex items-center justify-end gap-3'>
        {/* PREVIOUS */}
        {roleState.prevURL &&
        <button
            title={roleState.prevURL}
            onClick={() => paginateHandler(roleState?.prevURL)}
            className='group flex items-center justify-center gap-2 text-cyan-700'>
            <FaArrowLeftLong className='transition-all ease-in-out duration-200 group-hover:-translate-x-1' />
            Prev
        </button>
        }
        {/* NEXT */}
        {roleState.nextURL &&
        <button 
            title={roleState.nextURL}
            onClick={() => paginateHandler(roleState?.nextURL)}
            className='group flex items-center justify-center gap-2 text-cyan-700 '>
            <span>Next</span>
            <FaArrowRightLong className='transition-all ease-in-out duration-200 group-hover:translate-x-1' />
        </button>
        }
    </section>

    {/* MODAL */}
    <ModalAdd 
        isModal={isModal} 
        setIsModal={setIsModal} 
        getData={getData} />

    

    </>
  )
}
