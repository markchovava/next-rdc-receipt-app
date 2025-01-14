"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


/* AUTHENTICATED */
export async function idNumberVerifyApiAction(input) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
  if(!authToken?.value){ redirect('/login'); }
  const res = await fetch(`${baseURL}api/user-id-number-verify/${input}`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  });
  return await res.json();
}

export async function vendorVerifyApiAction(input) {
  const cookieStore = await cookies()
  const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
  if(!authToken?.value){ redirect('/login'); }
  const res = await fetch(`${baseURL}api/user-vendor-verify/${input}`, {
    'method': 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken?.value}`
    }
  });
  return await res.json();
}


export async function userListByRoleApiAction(id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user-by-role/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function userListApiAction() {
    const cookieStore = cookies()
    const authToken = cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function userPaginationApiAction(url) {
    const cookieStore = cookies()
    const authToken = cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function userSearchByEmailApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user-email-search/${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}


export async function userSearchApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user-search/${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/user');
    return await res.json();
}

export async function userViewApiAction(id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function userStoreApiAction(data) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/user');
    return await res.json();
}

export async function userUpdateApiAction(data, id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user/${id}`, {
      'method': 'POST',
      'body': data,
      headers: {
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath(`/admin/user/${id}`);
    return await res.json();
}

export async function userDeleteApiAction(id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/user/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/user');
    return await res.json();
}