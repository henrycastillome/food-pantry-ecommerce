import { createContext, useContext, useState, useEffect } from "react";

import { User } from "../types/UserTypes";
import { ContextError } from "../errors/Errors";


type CustomerContextType = {
    customer: User | null;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider=({children}:{children:React.ReactNode})=>{
    const [customer, setCustomer]=useState<User | null>(()=>{
        const storedCustomer = localStorage.getItem("customer");
        return storedCustomer ? JSON.parse(storedCustomer): null;
    })

    const [isValidCustomer, setIsValidCustomer] = useState<boolean>(!!customer)

    useEffect(()=>{
        if(customer){
            localStorage.setItem("customer", JSON.stringify(customer))

        } else{
            localStorage.removeItem("customer");
        }
    }, [customer]);

    return (
        <CustomerContext.Provider value={{ customer }}>
            {children}
        </CustomerContext.Provider>
    )

}
    
    export const useCustomerContext=()=>{
        const context=useContext(CustomerContext)

        if(context===undefined){
            throw new ContextError()
        }
        return context
    
       
    }
