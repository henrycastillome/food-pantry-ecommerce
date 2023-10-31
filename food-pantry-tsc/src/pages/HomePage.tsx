import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Header from "../sections/Header";
import { ToastContainer } from "react-toastify"
import Hero from "../sections/Hero";
import ProductSection from "../sections/ProductSection";
import Footer from "../sections/Footer";


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
              <ProductSection />
              <Footer />
            </>
          )}
      </main>
    )

    
        
    

}

export default HomePage