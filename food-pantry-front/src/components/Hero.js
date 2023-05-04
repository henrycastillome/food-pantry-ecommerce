import { Box, Heading, Text } from "@chakra-ui/react"
import FullScreenSection from "./FullScreenSection"

const Hero=()=>{
    return (
        <section>
        <FullScreenSection >
            <Box className="hero">
                <Box className="overlay">
                    <Heading as='h1' fontSize='6xl'>Welcome parents!</Heading>
                    <Box width='30%'>
                    <Text align='center' fontSize='xl'noOfLines={3}>join us in the fight against hunger! Our school's food pantry provides nutritious 
                        meals to all students in need. Thank you for your support!</Text>
                    </Box>

                </Box>

            </Box>










        </FullScreenSection>
        </section>
    )
}

export default Hero