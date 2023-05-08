import React, { useState, useEffect } from "react";
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
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Loader from "./Loader";

const Login = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCustomer, setIsCustomerValid}=useAuthContext()
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 2000);
  }, []);

  const isFormValid = () => !formik.dirty || !formik.isValid;
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
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
          "https://food-pantry.herokuapp.com/userLogin.php",
          body
        );
        console.log(response.data);
        const validUser = await response.data["status"];
        console.log(validUser);
        if (validUser === 1) {
          const newCustomer=response.data
          console.log('this is the new', newCustomer)
          setCustomer(newCustomer)
          setIsCustomerValid(true)

          toast.success(`${values.email} You have been logged in successfully`);
          setTimeout(()=>{
            navigate("/")
          }, 5000)
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
    <main>
    {isLoadingPage ? (
      <Loader />
    ) : (
    <>
    <Header />
    <Box pt={32} >
        <Box className="productPage">
          <Box className="overlay">
            <Box
              width="50%"
              py={16}
              gap={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              bg="rgba(50, 75, 74, 0.85)"
            >
              <Heading as="h1" fontSize="6xl">
               Welcome back!
              </Heading>
            </Box>
          </Box>
        </Box>
        </Box>
    <FullScreenSection
      pt={16}
      pb={16}
      width="100vw"
      backgroundColor="var(--color-white)"
    >
      <Box width='50vw'>
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

      <Heading as="h1" color='var(--color-dark)'>Login</Heading>

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
                  borderColor='var(--color-teal)'
                  focusBorderColor="teal.500"
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
                    borderColor='var(--color-teal)'
                  focusBorderColor="teal.500"
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
      </Box>
    </FullScreenSection>
    </>)}
    </main>
  );
};

export default Login;
