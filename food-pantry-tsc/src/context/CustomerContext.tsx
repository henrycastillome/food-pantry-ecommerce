import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/UserTypes";
import { ContextError } from "../errors/Errors";


export type CustomerContextType = {
    customer: User | null;
    setCustomer: React.Dispatch<React.SetStateAction<User | null>>;
    isValidCustomer: boolean;
    setIsValidCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider=({children}:{children:React.ReactNode})=>{
    const [customer, setCustomer]=useState<User | null>(()=>{
        const storedCustomer = sessionStorage.getItem("customer");
        try{
            console.log("storedCustomer",storedCustomer)
            return storedCustomer ? JSON.parse(storedCustomer): null;
        } catch(error){
            console.error("Error parsing customer data",error)
            return null
        }
        
    })
    

    const [isValidCustomer, setIsValidCustomer] = useState<boolean>(!!customer)

    useEffect(()=>{
        if(customer){
            sessionStorage.setItem("customer", JSON.stringify(customer))

        } else{
            sessionStorage.removeItem("customer");
        }
    }, [customer]);

    return (
        <CustomerContext.Provider value={{ customer, setCustomer, isValidCustomer, setIsValidCustomer }}>
            {children}
        </CustomerContext.Provider>
    )

}
    
/**
 * Custom hook to access the CustomerContext
 * @returns {CustomerContextType} The customer context value
 * @throws {ContextError} If used outside of a provider
 */
    export const useCustomerContext=()=>{
        const context=useContext(CustomerContext)

        if(!context){
            throw new ContextError()
        }
        return context
    
       
    }
