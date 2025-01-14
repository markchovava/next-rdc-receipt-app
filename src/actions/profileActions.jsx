"use server";

import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function passwordUpdateApiAction(data) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
  if(!authToken?.value){ redirect('/login'); }
  const res = await fetch(`${baseURL}api/password`, {
    'method': 'POST',
    'body': data,
    headers: {
      'Authorization': `Bearer ${authToken?.value}`
    }
  }); 
  revalidatePath('/admin/profile');
  return await res.json();
}


export async function profileStoreApiAction(data) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/profile`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/profile');
    return await res.json();
}


export async function profileViewAction() {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/profile`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}