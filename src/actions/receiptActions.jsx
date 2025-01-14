"use server";
import { baseURL } from "@/api/baseURL";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


/* AUTHENTICATED */
export async function receiptVerifyApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt-verify/${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    return await res.json();
}


export async function receiptListByUserApiAction() {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt-index-by-user`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    return await res.json();
}

export async function receiptSearchByUserApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt-search-by-user/${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    return await res.json();
}

export async function receiptListApiAction() {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    });
    return await res.json();
}

export async function receiptPaginationApiAction(url) {
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

export async function receiptSearchApiAction(input) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt-search/${input}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/receipt');
    return await res.json();
}

export async function receiptViewApiAction(id) {
    const cookieStore = await cookies();
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt/${id}`, {
      'method': 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    return await res.json();
}

export async function receiptStoreApiAction(data) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/receipt');
    return await res.json();
}

export async function receiptUpdateApiAction(data, id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt/${id}`, {
      'method': 'POST',
      'body': JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath(`/admin/receipt/${id}`);
    return await res.json();
}

export async function receiptDeleteApiAction(id) {
    const cookieStore = await cookies()
    const authToken = await cookieStore.get('RDC_RECEIPT_APP_AUTH_COOKIE');
    if(!authToken?.value){ redirect('/login'); }
    const res = await fetch(`${baseURL}api/receipt/${id}`, {
      'method': 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken?.value}`
      }
    }); 
    revalidatePath('/admin/receipt');
    return await res.json();
}