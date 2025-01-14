"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function checkAuth(){
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
  if(!authToken?.value){ 
    redirect('/login'); 
  }
  redirect('/admin')
}


export async function loginAction(data) {
    const res = await fetch(`${baseURL}login`, {
      'method': 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }); 
    revalidatePath('/admin');
    return await res.json();
}

export async function logoutAction(token) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
  if(!authToken?.value){ redirect('/login'); }
  const res = await fetch(`${baseURL}api/logout`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  });
  revalidatePath('/login');
  return await res.json();

}

export async function registerAction(data) {
    const res = await fetch(`${baseURL}register`, {
      'method': 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    revalidatePath('/login');
    return await res.json();
}