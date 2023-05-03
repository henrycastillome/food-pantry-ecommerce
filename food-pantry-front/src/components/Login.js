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
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isFormValid = () => !formik.dirty || !formik.isValid;
  const handleClick = () => setShow(!show);
  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const body = JSON.stringify(values);
        const response = await axios.post(
          "http://localhost/my_php/food-pantry-ecommerce/api/userLogin.php",
          body
        );
        console.log(response.data);
        const validUser = await response.data["status"];
        console.log(validUser);
        if (validUser === 1) {
          toast.success(`${values.email} You have been logged in successfully`);
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("invalid email").required("required"),
      pass: Yup.string()
        .min(8, "the password should be at least 8 characters long")
        .matches(/[0-9]/, "it should have one number")
        .required("required"),
    }),
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

      <Heading as="h1">Login</Heading>

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
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  borderColor="teal"
                  borderWidth="2px"
                  focusBorderColor=""
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={
                  formik.touched.pass && formik.errors.pass ? true : false
                }
              >
                <FormLabel htmlFor="pass">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="pass"
                    name="pass"
                    type={show ? "text" : "password"}
                    borderColor="teal"
                    borderWidth="2px"
                    focusBorderColor=""
                    {...formik.getFieldProps("pass")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "hide" : "show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.pass}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                width="full"
                isLoading={isLoading}
                loadingText="Loging in...."
                colorScheme="teal"
                variant="outline"
                spinnerPlacement="start"
                isDisabled={isFormValid()}
              >
                Log in
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default Login;
