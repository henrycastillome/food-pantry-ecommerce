import React, { useState } from "react";
import FullScreenSection from "./FullScreenSection";
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  Button,
  Spinner,
  HStack,
  InputRightElement,
  InputGroup,
  Select,
  CardFooter,
  Card,
  CardBody,
  Image,
  Stack, 
  Text
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";

const StockManagement = () => {
    const [imagePreview, setImagePreview]=useState(null)
    const handleImageUpload=(event)=>{
        const file=event.target.files[0]
        formik.setFieldValue('image',file)
        setImagePreview(URL.createObjectURL(file))
      }
  const formik = useFormik({
    initialValues: {
      category: "",
      productName: "",
      quantity: "",
      file:null
    },
    onSubmit: async (values) => {
      try {
        const body = alert(JSON.stringify(values));
        // const response = await axios.post("", body);
      } catch (error) {
        console.error("error", error);
      }
    },
    validationSchema:Yup.object().shape({
        image:Yup.mixed()
            .required("Image is required")
            .test("fileSize", "File Size is too large", (value)=>{
                return value && value.size <=5000000;})
            .test("fileType", "Unsupported file type", (value)=>{
                value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            })
    })

  });
  return (
    <FullScreenSection
      backgroundColor="white"
      alignItems=""
      spacing={8}
      width="50vw"
      pr={{ base: 8, md: 32 }}
      pl={{ base: 8, md: 32 }}
      pt={{ base: 8, md: 32 }}
      pb={{ base: 32, md: 32 }}
    >
      <Heading as="h1">Stock Management</Heading>

      <VStack w="100%" alignItems="start" justifyContent="flex-start">
        <Box p={6} rounded="md" w="100%">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              formik.handleSubmit();
            }}
            method="post"
            name="contact"
          >
            <VStack spacing={4}>
            <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >
              <FormLabel htmlFor="category">Category</FormLabel>
              <Select
                placeholder="Select Option"
                id="category"
                name="category"
                colorScheme="teal"
                variant="outline"
                borderColor="teal"
                {...formik.getFieldProps('category')}
              >
                <option value="Hygiene">Hygiene</option>
                <option value="Household items">Household items</option>
                <option value="food">Food</option>
              </Select>
              <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >

              <FormLabel htmlFor="productName">Product Name</FormLabel>
              <Input
                id="productName"
                name="productName"
                type="text"
                borderColor="teal"
                borderWidth="2px"
                {...formik.getFieldProps("productName")}
              />
              <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
              </FormControl>




              
              <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >

              <FormLabel htmlFor="quantity">Quantity</FormLabel>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                borderColor="teal"
                borderWidth="2px"
                {...formik.getFieldProps("quantity")}
              />
              <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
              </FormControl>

                  
              <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >

              <FormLabel htmlFor="quantity">Image</FormLabel>
              <Input
                id="image"
                name="image"
                type="file"
             
                border='none'
                onChange={handleImageUpload}
               
              />
              <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                width="full"
                
                loadingText="Loging in...."
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
             
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
      <VStack>

        <Card>
            <CardBody>
            {imagePreview? 
             (<Image
             src={imagePreview}
             alt='Green double couch with wooden legs'
             borderRadius='lg'
           />)
           :
            (<Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />) }
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{formik.values.category}</Heading>
      <Text>
       {formik.values.productName}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        {formik.values.quantity}
      </Text>
    </Stack>


            </CardBody>
            <CardFooter>

            </CardFooter>
        </Card>
      </VStack>
    </FullScreenSection>
  );
};

export default StockManagement;
