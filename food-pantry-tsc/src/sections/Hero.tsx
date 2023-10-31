import FullScreenSection from "../components/FullScreenSection"
import { Box, Button, Heading, Text } from "@chakra-ui/react"



const Hero:React.FC<{}>=()=>{

    return(
        <section>
            <FullScreenSection>
                <Box className="hero">
                    <Box className="overlay">
                        <Box
                            width="50%"
                            py={16}
                            gap={4}
                            display='flex'
                            flexDirection="column"
                            alignItems="center"
                            bg="rgba(50,75,74,0.85)"
                            >
                                <Heading as='h1' fontSize="6xl">
                                    Welcome parents!
                                </Heading>
                                <Box width="60%">
                                    <Text align="center" fontSize="xl" noOfLines={3}>
                                    join us in the fight against hunger! Our school's food pantry
                                    provides nutritious meals to all students in need. Thank you
                                    for your support!

                                    </Text>
                                </Box>

                                <Button colorScheme="teal">See products</Button>

                        </Box>
                    </Box>
                </Box>
            </FullScreenSection>
        </section>
    )
}

export default Hero;