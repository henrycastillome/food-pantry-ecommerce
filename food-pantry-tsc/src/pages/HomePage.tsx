import React, { useState, useEffect } from "react";
import Loader from "../utils/Loader";
import Header from "../components/Header";


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
            </>
          )}
      </main>
    )

    
        
    

}

export default HomePage