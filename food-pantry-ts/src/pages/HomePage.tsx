import { useEffect, useState } from "react";

const HomePage=()=>{
    const [isLoading, setIsLoading]=useState<boolean>(true)

    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        }, 1500)
    },[])


return (
    <main>
        Henry Castillo
    </main>
)

}


export default HomePage()