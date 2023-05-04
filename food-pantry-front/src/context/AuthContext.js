import {createContext, useContext, useState,useEffect} from 'react'



const AuthContext=createContext(undefined);

export const AuthProvider=({children})=>{

    const [user, setUser]=useState(()=>{
        const storedUser=localStorage.getItem('user');
        return storedUser? storedUser : null
    })
    const [isAuthenticated, setIsAuthenticated]=useState(false)

    useEffect(()=>{
        if(user){
            localStorage.setItem('user', user)
            setIsAuthenticated(true)
        } else{
            localStorage.removeItem('user')
        }
    }, [user])

        

   

    return (
        <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext=()=>useContext(AuthContext)
