import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "../types/UserTypes";
import { json } from "stream/consumers";
import { ContextError } from "../errors/Errors";

type UserContextType = {
    userManager: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export  const UserProvider=({children}:{children:React.ReactNode})=>{
    const [userManager, setUserManager] = useState<User | null>(()=>{
        const storedUserManager = localStorage.getItem("userManager");
        return storedUserManager ? JSON.parse(storedUserManager): null;
    
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userManager)

    useEffect(()=>{
        if(userManager){
            localStorage.setItem("userManager", JSON.stringify(userManager))

        } else{
            localStorage.removeItem("userManager");
        }
    }, [userManager]);
   

    return (
        <UserContext.Provider value={{ userManager }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext=(()=>{
    const context=useContext(UserContext)

    if(context===undefined){
        throw new ContextError
    }
    return context
})