import FullScreenSection from "./FullScreenSection"
import roundlogo from "../images/roundlogo.png"


const Loader=()=>{

    return <FullScreenSection
            alignItems='center'
            justifyContent='center'
            width='100vw'
            height='100vh'
            backgroundColor='var(--color-white)'
    >
        <img className="loader" src={roundlogo} alt="logonycdoe" width='82px'/>
    </FullScreenSection>
        
        
}

export default Loader