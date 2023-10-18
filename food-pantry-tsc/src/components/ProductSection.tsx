import { Box, Heading } from "@chakra-ui/react"
import FullScreenSection from "../utils/FullScreenSection"



const ProductSection:React.FC<{}> =()=>{
    return(
        <FullScreenSection
            pt={16}
            pb={16}
            width="100vw"
            backgroundColor="var(--color-white)">

                <main>
                    <Box
                        width="80vw"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={16}
                        >
                            <Heading id="product-section">Products</Heading>

                    </Box>
                </main>

        </FullScreenSection>
    )
}

export default ProductSection