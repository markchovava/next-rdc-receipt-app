"use client";
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong, FaEye } from 'react-icons/fa6';
import { IoSearch } from "react-icons/io5";
import { MdDeleteForever, MdEdit, MdOutlineMoreVert } from "react-icons/md";
import { motion } from 'framer-motion';
import Link from 'next/link';
import ModalAdd from './ModalAdd';
import { AdminContextState } from '@/context/AdminContext';
import { userDeleteApiAction, userListApiAction, userListByRoleApiAction, userPaginationApiAction, userSearchApiAction } from '@/actions/userActions';
import { toast } from 'react-toastify';
import { reactToastifyDark } from '@/utils/reactToastify';
import Loader from '@/components/Loader';



export default function UserList({ dbData, rolesData, districtsData }) {
  const {userState, userDispatch} = AdminContextState();
  const [districts, setDistricts] = useState(districtsData?.data)
  const [isModal, setIsModal] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [roles, setRoles] = useState(rolesData?.data);
  const [roleId, setRoleId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
      userDispatch({type: 'ADD_DATA', payload: {
            items: dbData?.data,
            prevURL: dbData?.links?.prev,
            nextURL: dbData?.links?.next,
        }});
    }, []);

    async function paginateHandler(url) {
        try{
            const res = await userPaginationApiAction(url)
            userDispatch({type: 'ADD_DATA', payload: {
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
          getData();
          setIsSearch(false);
          return;
        }
        try{
          const res = await userSearchApiAction(search);
          userDispatch({type: 'ADD_DATA', payload: {
              items: res?.data,
              prevURL: res?.links.prev,
              nextURL: res?.links.next,
          }});
          setIsSearch(false);
          } catch (error) {
            console.error(`Error: ${error}`); 
            setIsSearch(false);
        }
    }
    
    async function getDataByRole(role_id) {
        userDispatch({type: 'EMPTY_ITEMS'});
        if(role_id == '') {
          await getData();
          return;
        }
        try{
            const res = await userListByRoleApiAction(role_id);
            userDispatch({type: 'ADD_DATA', payload: {
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
            const res = await userListApiAction();
            userDispatch({type: 'ADD_DATA', payload: {
                items: res?.data,
                prevURL: res?.links.prev,
                nextURL: res?.links.next,
            }});
            } catch (error) {
                console.error(`Error: ${error}`); 
          }
    }
    
    async function deleteData(id) {
        userDispatch({type: 'EMPTY_ITEMS'});
        try{
            const res = await userDeleteApiAction(id);
            if(res.status == 1) {
                await getData();
                toast.success(res?.message, reactToastifyDark);
                return;
            }
            } catch (error) {
                console.error(`Error: ${error}`); 
        }
    }
    
    if(!userState.items) { return <Loader /> }


  return (
    <>
      {/* TOP */}
      <section className='w-[100%] mt-6 bg-white drop-shadow-md '>
        {/* SEARCH */}
        <div className='mx-auto w-[96%] flex items-center justify-between gap-4 py-3'>
          <form action={getSearchData} onSubmit={() => setIsSearch(true)} className='lg:w-[40%] flex items-center justify-start transition-all ease-in-out border border-slate-200 hover:border-slate-500 w-[100%] outline-none rounded-xl'>
            <input 
              type='text' 
              name='search' 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-[80%] px-3 py-3 rounded-l-xl outline-none'
              placeholder='Enter Name here...' />
            <button 
              type='submit' 
              className='p-3 w-[20%] h-[100%] rounded-r-xl transition-all ease-in-out flex justify-center items-center border-l border-slate-200 hover:border-l hover:border-slate-500'>
              {isSearch ? 
              <span className='animate-pulse w-[15px] h-[15px] rounded-full bg-slate-900'></span>
              : <IoSearch className='text-lg' />
              }
            </button>
          </form>
          <div className='flex items-center justify-end gap-3'>
            {roles &&
            <select 
              onChange={(e) => {
                getDataByRole(e.target.value);
                setRoleId(e.target.value)
              }} 
              className='py-3 px-5 rounded-xl outline-none border border-slate-400'>
              <option value=''>All</option>
              { roles?.map((i, key) => (
                <option key={key} value={i?.id} selected={i?.id == roleId && 'selected'}>
                  {i?.name}
                </option>
              )) }
            </select>
            }
      
            <button 
              onClick={() => setIsModal(true)} 
              className='py-3 px-5 rounded-xl text-white transition-all ease-in-out duration-200 bg-gradient-to-br from-cyan-500 to-blue-600 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-700 hover:drop-shadow-md'>
              Add
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="w-[100%] lg:overflow-hidden overflow-scroll">
        <section className='lg:w-[100%] w-[60rem]'>
          {/* HEADER */}
          <div className='mx-auto w-[96%] text-lg py-2 flex items-center justify-start font-bold font-white bg-slate-200 '>
            <div className='w-[30%] border-r border-white px-3 py-2'>FULL NAME</div>
            <div className='w-[15%] border-r border-white px-3 py-2'>ROLE</div>
            <div className='w-[20%] border-r border-white px-3 py-2'>EMAIL</div>
            <div className='w-[20%] border-r border-white px-3 py-2'>CODE</div>
            <div className='w-[15%] px-3 py-2'>ACTION</div>
          </div>
          {/* DETAILS */}
          { userState?.items | userState?.items?.length > 0 ? 
            userState.items.map((i, key) => (
            <div key={key} className='mx-auto w-[96%] bg-white py-2 flex items-center justify-start border border-slate-300 '>
              <div className='w-[30%] border-r border-slate-300 px-3 py-1'>{i.fname}</div>
              <div className='w-[15%] border-r border-slate-300 px-3 py-1'>{i?.role?.name ? i?.role?.name : 'Not Added.'}</div>
              <div className='w-[20%] border-r border-slate-300 px-3 py-1'>{i?.email}</div>
              <div className='w-[20%] border-r border-slate-300 px-3 py-1'>{i?.code}</div>
              <div className='w-[15%] px-3 py-1 text-xl flex items-center justify-center gap-2'>
                <Link title='View' href={`/admin/user/${i?.id}`}> 
                  <FaEye className='hover:text-blue-500 duration-150 hover:scale-110 transition-all ease-in'/> 
                </Link>
                <Link title='Edit' href={`/admin/user/edit/${i?.id}`}> 
                  <MdEdit className='hover:text-green-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                </Link>  
                <button title='Delete' onClick={() => deleteData(i?.id)}> 
                    <MdDeleteForever 
                      className='hover:text-red-500 duration-150 hover:scale-110 transition-all ease-in' /> 
                </button>
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
          {userState.prevURL &&
          <button
              title={userState.prevURL}
              onClick={() => paginateHandler(userState?.prevURL)}
              className='group flex items-center justify-center gap-2 text-cyan-700'>
              <FaArrowLeftLong className='transition-all ease-in-out duration-200 group-hover:-translate-x-1' />
              Prev
          </button>
          }
          {/* NEXT */}
          {userState.nextURL &&
          <button 
              title={userState.nextURL}
              onClick={() => paginateHandler(userState?.nextURL)}
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
        roles={roles}
        getData={getData}
        districts={districts} 
      />



    
    
    </>
  )
}
