import { useEffect, useState } from "react";
import { useCustomerContext } from "../context/CustomerContext";
import * as Yup from "yup";
import {  useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "./Header";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setCustomer, setIsValidCustomer } = useCustomerContext();
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 2000);
  }, []);

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

        const validUser = response.data["status"];
        if (validUser === 1) {
          const newCustomer = response.data
          setCustomer(newCustomer);
          setIsValidCustomer(true);
          toast.success("Welcome back " + values.email);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          toast.error("Invalid credentials");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },

    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
      pass: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/(?=.*[0-9])/, "Password must contain a number")
        .required("Required"),
    }),
  });

  return (
    <main>
      {isLoadingPage ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Box pt={32}>
            <Box className="productPage">
              <Box className="overlay">
                <Box
                  width="50%"
                  py={16}
                  gap={4}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  bg="rgba(50,75,74, 0.85)"
                >
                  <Heading as="h1" fontSize="6xl">
                    Welcome Back!
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
            <Box width="50vw">
              <ToastContainer />
              <Heading as="h1" color="var(--color-dark)">
                Login
              </Heading>

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
                          formik.touched.email && formik.errors.email
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          id="email"
                          type="email"
                          borderColor="var(--color-teal)"
                          focusBorderColor="teal.500"
                          {...formik.getFieldProps("email")}
                        />
                        <FormErrorMessage>
                          {formik.errors.email}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={
                          formik.touched.pass && formik.errors.pass
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="pass">Password</FormLabel>
                        <InputGroup>
                          <Input
                            id="pass"
                            type={show ? "text" : "password"}
                            borderColor="var(--color-teal)"
                            focusBorderColor="teal.500"
                            {...formik.getFieldProps("pass")}
                          />
                          <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                              {show ? "hide" : "show"}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {formik.errors.pass}
                        </FormErrorMessage>
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
        </>
      )}
    </main>
  );
};

export default Login;
