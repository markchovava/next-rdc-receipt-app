"use client"
import { GrUserSettings, GrMailOption } from 'react-icons/gr'
import { BiChevronDown, BiChevronUp, BiSolidExit } from 'react-icons/bi'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FaUser } from 'react-icons/fa'
import { BsPencilFill } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import { useState } from 'react'
import Link from 'next/link'
import { cookieAuthClient } from '@/cookies/cookieAuthClient'
import { cookieRoleClient } from '@/cookies/cookieRoleClient'
import { tokenAuth } from '@/localstorage/tokenAuth'
import { tokenRole } from '@/localstorage/tokenRole'
import { reactToastifyDark } from '@/utils/reactToastify'
import { toast } from 'react-toastify'
import { logoutAction } from '@/actions/authActions'
import { useRouter } from 'next/navigation'
import { IoMdInformationCircle } from "react-icons/io";


export default function Header({authData}) {
  const [auth, setAuth] = useState(authData?.data)
  const router = useRouter();
  const [isActive, setIsActive] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const { removeAuthCookie } = cookieAuthClient();
  const { removeRoleCookie } = cookieRoleClient();
  const { removeAuthToken } = tokenAuth();
  const { removeRoleToken } = tokenRole();

   async function logout() {
        try{
            const res = await logoutAction();
            console.log(res)
            if(res.status == 1) {
              removeAuthCookie(); 
              removeRoleCookie();
              removeAuthToken();
              removeRoleToken();
              router.push('/login');
              toast.success(res.message, reactToastifyDark);
              return;
            }
            } catch (error) {
                console.error(`Error: ${error}`);
        }
    }
 
  return (
    <div className='w-[100%] lg:h-[3.5rem] bg-white drop-shadow-lg '>
      <div className='mx-auto w-[96%] flex lg:flex-row flex-col gap-4 items-center justify-between py-4 '>
        <section className="flex items-center justify-center">
            <h4 className='font-medium flex items-center justify-start gap-1'>
              <span className='text-blue-800'>RDC</span>
              <span className=''>Receipting</span>
              <span className='text-red-600'>App</span>
            </h4> 
        </section>

        <section className="">
            <ul className="flex justify-end gap-2 items-center">
              {/* SETTINGS */}
              <li className='ml-4 relative '>
                <button 
                  onClick={() => setIsActive({two: !isActive.two})}
                  className='flex justify-end gap-2 items-center cursor-pointer text-slate-800 hover:text-black'>
                  <FiSettings className='text-lg'/>
                  { isActive.two 
                  ? <BiChevronDown className='text-lg' /> 
                  : <BiChevronUp className='text-lg' /> }
                </button>
                { isActive.two &&
                <ul className='bg-white w-[11rem] top-11 rounded-md right-0 absolute py-1 '>
                    <li className='text-slate-800 hover:text-black px-3 transition-all ease-in-out hover:bg-slate-50'>
                        <Link href="/admin/app-info" className='flex justify-start gap-2 p-1 items-center text-sm'>
                            <span className='flex justify-center items-center bg-slate-800 p-1 rounded-full text-white'>
                            <IoMdInformationCircle />
                            </span> 
                            App Info
                          </Link>
                      </li>
                    {auth?.role?.level <= 3 &&
                      <li className='text-slate-800 hover:text-black px-3 transition-all ease-in-out hover:bg-slate-50'>
                        <Link href="/admin/role" className='flex justify-start gap-2 p-1 items-center text-sm'>
                            <BsPencilFill /> Roles
                        </Link>
                      </li>
                    }
                </ul>
                }
              </li>
              {/* USER */}
              <li className='ml-4 relative z-20'>
                <button 
                  onClick={() => setIsActive({three: !isActive.three})}
                  className='flex justify-end gap-2 items-center cursor-pointer text-slate-800 hover:text-black'>
                  <GrUserSettings className='text-lg'/>
                  { isActive.three 
                  ? <BiChevronDown className='text-lg' /> 
                  : <BiChevronUp className='text-lg' /> }
                </button>
                {isActive.three &&
                  <ul className='bg-white w-[15rem] top-11 rounded-md right-0 absolute py-2 z-50'>
                      <li className='text-slate-800 hover:text-black px-3 hover:bg-slate-50'>
                          <Link href="/admin/profile" className='flex justify-start gap-2 p-1 items-center text-sm'>
                              <FaUser /> My Profile</Link></li>
                      <li className='text-slate-800 hover:text-black px-3 hover:bg-slate-50'>
                          <Link href="/admin/profile/password" className='flex justify-start gap-2 p-1 items-center text-sm'>
                              <RiLockPasswordFill /> Update Password</Link></li>
                      <li className='text-slate-800 hover:text-black px-3 hover:bg-slate-50'>
                          <button onClick={logout} className='flex justify-start gap-2 p-1 items-center text-sm'>
                              <BiSolidExit /> Sign Out</button></li>
                  </ul>
                }
              </li>
            </ul>
        </section>
      </div>  
    </div>
  )
}

