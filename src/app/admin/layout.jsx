import AdminContextProvider from "@/context/AdminContext";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import { profileViewAction } from "@/actions/profileActions";



export default async function Layout({ children }) {
  const authData = await profileViewAction();


    return (
      <>
      <AdminContextProvider>
        <div className="grid lg:grid-cols-5 grid-cols-1">
          <div className="col-span-1 bg-slate-900">
            <Sidebar />
          </div>
          <div className="col-span-4">
            <Header authData={authData} />
            {children}
          </div>
        </div>
      </AdminContextProvider>
      </>
    )
  }