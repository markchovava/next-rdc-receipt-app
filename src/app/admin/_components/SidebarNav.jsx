"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp, BiChevronRight } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";  


const ulVariant = {
    hidden: { opacity: 0, y: -20},
    visible: {
        opacity: 1, y: 0,
        transition: {type: 'spring', duration: 1} },
}
const liVariant = {
    start: { x: 0},
    animate: {
        x: 10,
        transition: {type: 'spring', duration: 0.4} },
}


export default function SidebarNav({ authData }) {
    const [auth, setAuth] = useState(authData?.data);
    const [isActive, setIsActive] = useState({
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false,
        seven: false,
        eight: false,
        nine: false,
        ten: false,
    });

  return (
    <>
    <section className='w-[100%]'>
        <ul className='px-6 py-4 flex flex-col gap-4'>
            { auth?.role?.level <= 3 &&
            <>
                {/* USERS */}
                <li>
                    <motion.button 
                        onClick={() => setIsActive({...isActive, one: !isActive.one })} 
                        className={`w-[100%] flex items-center justify-between gap-2  ${isActive.one == true && 'font-semibold'}`}>
                        <span> Users </span>
                        {isActive.one == true 
                        ? <motion.span initial={{}}><BiChevronUp className='text-lg' /></motion.span>
                        : <BiChevronDown className='text-lg' /> }  
                    </motion.button>
                    <AnimatePresence>
                        {isActive.one == true &&
                        <motion.ul 
                        variants={ulVariant} 
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        className={`text-sm py-2 pl-4`}>
                            <motion.li 
                            variants={liVariant}
                            initial='start'
                            whileHover='animate'
                            className={`py-1 `}>
                                <Link href='/admin/user'className={` flex items-center justify-start gap-1`}>
                                <FaAngleRight /> Users List </Link>
                            </motion.li>
                        </motion.ul>
                        }
                    </AnimatePresence>
                </li>
                {/* MACHINE */}
                <li>
                    <motion.button 
                        onClick={() => setIsActive({...isActive, two: !isActive.two })} 
                        className={`w-[100%] flex items-center justify-between gap-2  ${isActive.two == true && 'font-semibold'}`}>
                        <span>Machines</span>
                        {isActive.two == true 
                        ? <BiChevronUp className='text-lg' />
                        : <BiChevronDown className='text-lg' /> }  
                    </motion.button>
                    <AnimatePresence>
                        {isActive.two == true &&
                        <motion.ul 
                        variants={ulVariant} 
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        className={`text-sm py-2 pl-4`}>
                            <motion.li 
                            variants={liVariant}
                            initial='start'
                            whileHover='animate'
                            className={`py-1 `}>
                                <Link href='/admin/machine'className={` flex items-center justify-start gap-1`}>
                                <FaAngleRight /> Machines List</Link>
                            </motion.li>
                        </motion.ul>
                        }
                    </AnimatePresence>
                </li>
                {/* DISTRICT */}
                <li>
                    <motion.button 
                        onClick={() => setIsActive({...isActive, nine: !isActive.nine })} 
                        className={`w-[100%] flex items-center justify-between gap-2  ${isActive.nine == true && 'font-semibold'}`}>
                        <span>Districts</span>
                        {isActive.two == true 
                        ? <BiChevronUp className='text-lg' />
                        : <BiChevronDown className='text-lg' /> }  
                    </motion.button>
                    <AnimatePresence>
                        {isActive.nine == true &&
                        <motion.ul 
                        variants={ulVariant} 
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        className={`text-sm py-2 pl-4`}>
                            <motion.li 
                            variants={liVariant}
                            initial='start'
                            whileHover='animate'
                            className={`py-1 `}>
                                <Link href='/admin/district'className={` flex items-center justify-start gap-1`}>
                                <FaAngleRight /> District List</Link>
                            </motion.li>
                        </motion.ul>
                        }
                    </AnimatePresence>
                </li>
            </>
            }
            {/* RECEIPT */}
            <li>
                <motion.button 
                    onClick={() => setIsActive({...isActive, eight: !isActive.eight })} 
                    className={`w-[100%] flex items-center justify-between gap-2  ${isActive.eight && 'font-semibold'}`}>
                    <span>Receipts</span>
                    {isActive.eight 
                    ? <BiChevronUp className='text-lg' />
                    : <BiChevronDown className='text-lg' /> }  
                </motion.button>
                <AnimatePresence>
                    {isActive.eight &&
                    <motion.ul 
                    variants={ulVariant} 
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className={`text-sm py-2 pl-4`}>
                        <motion.li 
                        variants={liVariant}
                        initial='start'
                        whileHover='animate'
                        className={`py-1 `}>
                            <Link href='/admin/receipt' className={` flex items-center justify-start gap-1`}>
                            <FaAngleRight /> Receipts </Link>
                        </motion.li>
                    </motion.ul>
                    }
                </AnimatePresence>
            </li>
            { auth?.role?.level <= 3 &&
            <>
                {/* VERIFY */}
                <li>
                    <motion.button 
                        onClick={() => setIsActive({...isActive, ten: !isActive.ten })} 
                        className={`w-[100%] flex items-center justify-between gap-2  ${isActive.ten && 'font-semibold'}`}>
                        <span>Verify</span>
                        {isActive.ten 
                        ? <BiChevronUp className='text-lg' />
                        : <BiChevronDown className='text-lg' /> }  
                    </motion.button>
                    <AnimatePresence>
                        {isActive.ten &&
                        <motion.ul 
                        variants={ulVariant} 
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        className={`text-sm py-2 pl-4`}>
                            <motion.li 
                                variants={liVariant}
                                initial='start'
                                whileHover='animate'
                                className={`py-1 `}>
                                <Link href='/admin/verify/receipt' className={` flex items-center justify-start gap-1`}>
                                <FaAngleRight /> Verify Receipt </Link>
                            </motion.li>
                            <motion.li 
                                variants={liVariant}
                                initial='start'
                                whileHover='animate'
                                className={`py-1 `}>
                                <Link href='/admin/verify/vendor' className={` flex items-center justify-start gap-1`}>
                                <FaAngleRight /> Verify Vendor </Link>
                            </motion.li>
                            <motion.li 
                                variants={liVariant}
                                initial='start'
                                whileHover='animate'
                                className={`py-1 `}>
                                <Link href='/admin/verify/user' className={` flex items-center justify-start gap-1`}>
                                <FaAngleRight /> Verify User </Link>
                            </motion.li>
                        </motion.ul>
                        }
                    </AnimatePresence>
                </li>
            </>
            }
     
            {/* SETTINGS */}
            <li>
                <motion.button 
                    onClick={() => setIsActive({...isActive, seven: !isActive.seven })} 
                    className={`w-[100%] flex items-center justify-between gap-2 transition-all ease-in-out duration-100 ${isActive.seven && 'font-semibold'}`}>
                    <span>Settings</span>
                    {isActive.seven
                    ? <BiChevronUp className='text-lg' />
                    : <BiChevronDown className='text-lg' /> }  
                </motion.button>
                <AnimatePresence>
                    {isActive.seven &&
                    <motion.ul 
                    variants={ulVariant} 
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    className={`text-sm py-2 pl-4`}>
                        <motion.li 
                            variants={liVariant}
                            initial='start'
                            whileHover='animate'
                            className={`py-1 `}>
                            <Link 
                                href='/admin/app-info' 
                                className={` flex items-center justify-start gap-1`}>
                                <FaAngleRight /> AppInfo </Link>
                        </motion.li>
                        {auth?.role?.level <= 3 &&
                        <motion.li 
                            variants={liVariant}
                            initial='start'
                            whileHover='animate'
                            className={`py-1 `}>
                            <Link href='/admin/role'className={` flex items-center justify-start gap-1`}>
                            <FaAngleRight /> Roles List </Link>
                        </motion.li>
                        }
                       
                    </motion.ul>
                    }
                </AnimatePresence>
            </li>
        </ul>
    </section>
    </>
  )
}
