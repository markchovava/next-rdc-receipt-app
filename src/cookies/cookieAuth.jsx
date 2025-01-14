import { checkAuthAction } from "@/actions/authActions";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

 
export const cookieAuth = () => {
    
    const getAuthCookie = async () => {
        const authCookie = getCookie('RDC_RECEIPT_APP_AUTH_COOKIE', { cookies });
        return authCookie;
    }
    
    const checkAuthCookie = async () => {
        const authCookie = getCookie('RDC_RECEIPT_APP_AUTH_COOKIE', { cookies });
        await checkAuthAction(authCookie)
    }
   
    return {
        getAuthCookie,
        checkAuthCookie,
    }
  }
