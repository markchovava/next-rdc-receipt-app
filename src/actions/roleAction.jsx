"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


/* AUTHENTICATED */
export async function roleListAllApiAction() {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/role-all`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function roleListApiAction() {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/role`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    // revalidatePath('/login');
    return await res.json();
}

export async function rolePaginationApiAction(url) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(url, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    // revalidatePath('/login');
    return await res.json();
}

export async function roleSearchApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/role-search/${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/role');
    return await res.json();
}

export async function roleViewApiAction(id) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/role/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    // revalidatePath('/login');
    return await res.json();
}

export async function roleStoreApiAction(data) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/role`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/role');
    return await res.json();
}

export async function roleUpdateApiAction(data, id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/role/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath(`/admin/role/${id}`);
    return await res.json();
}

export async function roleDeleteApiAction(id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/role/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/role');
    return await res.json();
}