"use client"
import { DistrictInit, DistrictInitialState, DistrictReducer } from "@/reducers/districtReducer";
import { MachineInit, MachineInitialState, MachineReducer } from "@/reducers/machineReducer";
import { ReceiptInit, ReceiptInitialState, ReceiptReducer } from "@/reducers/receiptReducer";
import { RoleInit, RoleInitialState, RoleReducer } from "@/reducers/RoleReducer";
import { UserInit, UserInitialState, UserReducer } from "@/reducers/UserReducer";
import { createContext, useContext, useReducer } from "react";



export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
    const [roleState, roleDispatch] = useReducer(RoleReducer, RoleInitialState, RoleInit);
    const [userState, userDispatch] = useReducer(UserReducer, UserInitialState, UserInit);
    const [machineState, machineDispatch] = useReducer(MachineReducer, MachineInitialState, MachineInit);
    const [districtState, districtDispatch] = useReducer(DistrictReducer, DistrictInitialState, DistrictInit);
    const [receiptState, receiptDispatch] = useReducer(ReceiptReducer, ReceiptInitialState, ReceiptInit);

    return (
        <AdminContext.Provider value={{  
            roleState, roleDispatch,
            userState, userDispatch,
            machineState, machineDispatch,
            districtState, districtDispatch,
            receiptState, receiptDispatch,
        }}>
            {children}
        </AdminContext.Provider>
      )
}

export const AdminContextState = () => {
    return useContext(AdminContext)
}
 
