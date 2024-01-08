import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/UserTypes";
import { ContextError } from "../errors/Errors";

type UserContextType = {
    userManager: User | null;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    setUserManager: React.Dispatch<React.SetStateAction<User | null>>;
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
        <UserContext.Provider value={{ userManager, isAuthenticated, setIsAuthenticated, setUserManager }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext=(()=>{
    const context=useContext(UserContext)

    if(!context){
        throw new ContextError()
    }
    return context
})