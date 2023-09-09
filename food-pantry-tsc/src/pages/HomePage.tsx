import React, { useState, useEffect } from "react";
import Loader from "../utils/Loader";


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
            <h1>Henry Castillo</h1>
          )}
      </main>
    )

    
        
    

}

export default HomePage