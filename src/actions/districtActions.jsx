"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


/* AUTHENTICATED */
export async function districtListAllApiAction() {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/district-all`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function districtListApiAction() {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/district`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    return await res.json();
}

export async function districtPaginationApiAction(url) {
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
    return await res.json();
}

export async function districtSearchApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/district-search/${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/district');
    return await res.json();
}

export async function districtViewApiAction(id) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/district/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function districtStoreApiAction(data) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/district`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/district');
    return await res.json();
}

export async function districtUpdateApiAction(data, id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/district/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath(`/admin/district/${id}`);
    return await res.json();
}

export async function districtDeleteApiAction(id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/district/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/district');
    return await res.json();
}