import { HStack, Text, VStack } from "@chakra-ui/react"
import FullScreenSection from "./FullScreenSection"
import logonycnobg from '../images/nycdoenobg.png'



const Footer=()=>{
    const todayDate=new Date();
    let year=todayDate.getFullYear();



    return (
        <FullScreenSection
            backgroundColor='var(--color-gray)'
            color='var(--color-second-dark)'
            alignItems='center'
            pt={16} pb={16} width="100vw"
            >
            <footer>
                <VStack>
                    <HStack width='70vw'>
                        <img src={logonycnobg} alt="logonycdoe" width='300px'/>
                        <Text as='cite' noOfLines={2}>
                            "Nobody can do everything, but everyone can do something. 
                            Donate to our food pantry today and make a difference in someone's life." Unknown
                        </Text>


                    </HStack>
                  
                <Text fontSize='4xl'> Food Pantry NYC Public School</Text>
                <Text> © Copyright {year}. Designed and built by <b>Henry Castillo</b> </Text>
                </VStack>
            </footer>

        </FullScreenSection>
    )
}

export default Footer