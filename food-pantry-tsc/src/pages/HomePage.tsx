import React, { useState, useEffect } from "react";
import Loader from "../utils/Loader";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify"
import Hero from "../components/Hero";


const HomePage:React.FC=()=>{

    const [isLoading, setIsloading]=useState<boolean>(true)

    useEffect(() => {
      setTimeout(()=>{
        setIsloading(false)
      }, 1500)

    }, [])

    return (
      <main>
        {isLoading ? (<Loader /> ):
          (
            <>
              <Header />
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
              
              <Hero />
            </>
          )}
      </main>
    )

    
        
    

}

export default HomePage