"use client";
import {setCookie, deleteCookie } from 'cookies-next';


const cookieDuration = 60 * 60 * 24 * 30 * 30;
export const cookieAuthClient = () => {
    const setAuthCookie = (token) => {
        setCookie('RDC_RECEIPT_APP_AUTH_COOKIE', token, { maxAge: cookieDuration });
    }
   
    const removeAuthCookie = () => {
        deleteCookie('RDC_RECEIPT_APP_AUTH_COOKIE');
    }

    return {
        setAuthCookie, 
        removeAuthCookie,
    }
  }