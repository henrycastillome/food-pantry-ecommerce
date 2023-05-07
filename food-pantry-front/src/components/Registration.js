import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const [isCheckingStudentId, setIsCheckingStudentId] = useState(false);
  const [studentExists, setStudentExists] = useState(false);
  const [studentSuccess, setStudentSuccess] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(false);
    }, 2000);
  }, []);

  const isFormValid = () => {
    return !formik.dirty || !formik.isValid;
  };
  const phoneRegExp = /^(?:\+?\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      pass: "",
      passwordConfirmation: "",
      phoneNumber: "",
      studentId: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const body = JSON.stringify(values);
        const response = await axios.post(
          "http://localhost/my_php/food-pantry-ecommerce/api/registration.php",
          body
        );
        console.log(response);

        const status = response.data["status"];

        console.log(status);

        if (status === 1) {
          toast.success(
            `${values.firstName}, your account has been created successfully`
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
          formik.resetForm();
        } else {
          toast.error("Error server:", status);
        }
      } catch (error) {
        console.error("ErrorCatch:", error);
        toast.error("something went wrong, try again later");
      }
      setIsLoading(false);
      setIsSuccess(false);
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),
      lastName: Yup.string()
        .min(2, "Too Short!")
        .max(15, "Too Long!")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      pass: Yup.string()
        .min(8, "At least 8 characters long")
        .matches(/[0-9]/, "add at least one number")
        .required("Required"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("pass"), null], "Both password must match")
        .required("Required"),
      phoneNumber: Yup.string()
        .min(10, "add 10")
        .matches(phoneRegExp, "Phone is not valid")
        .required("Required")
        .test("uniqueness", "phone already exist", (value) => !phoneExists),

      studentId: Yup.string()
        .required("Required")
        .matches(/^\d{5}$/, "Must be exactly 5 numbers"),
    }),
  });

  const checkPhoneNumber = async (phoneNumber) => {
    setIsCheckingPhone(true);
    try {
      const response = await axios.get(
        `http://localhost/my_php/food-pantry-ecommerce/api/registration.php`,
        { params: { phoneNumber } }
      );
      console.log("response:", response);
      const count = response.data["COUNT(*)"];
      console.log(count);
      if (count > 0) {
        setPhoneExists(true);

        formik.setFieldError("phoneNumber", "Phone number already exists");
      } else {
        setPhoneExists(false);
        formik.setFieldError("phoneNumber", "");
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("error checking phone number:", error);
    } finally {
      setIsCheckingPhone(false);
    }
  };

  const checkStudentId = async (studentId) => {
    setIsCheckingStudentId(true);
    try {
      const response = await axios.get(
        "http://localhost/my_php/food-pantry-ecommerce/api/studentCheck.php",
        { params: { studentId } }
      );
      const check = response.data["COUNT(*)"];
      console.log(check);
      if (check > 0) {
        setStudentExists(true);
        setStudentSuccess(true);
      } else {
        setStudentExists(false);
        formik.setFieldError(
          "studentId",
          "The student does not exist or it has been taken already"
        );
      }
    } catch (error) {
      console.error("error checking student id: ", error);
    } finally {
      setIsCheckingStudentId(false);
    }
  };

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
                  bg="rgba(50, 75, 74, 0.85)"
                >
                  <Heading as="h1" fontSize="6xl">
                    Registration
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
                    <input type="hidden" name="contact" value="contact" />

                    <VStack spacing={4}>
                      <FormControl
                        isInvalid={
                          formik.touched.firstName && formik.errors.firstName
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="firstName" textStyle="body">
                          Name
                        </FormLabel>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Your name"
                          borderColor="var(--color-teal)"
                          focusBorderColor="teal.500"
                          {...formik.getFieldProps("firstName")}
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                        />

                        <FormErrorMessage>
                          {formik.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          formik.touched.lastName && formik.errors.lastName
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="lastName" textStyle="body">
                          Last Name
                        </FormLabel>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Your last name"
                          borderColor="var(--color-teal)"
                          focusBorderColor="teal.500"
                          value={formik.values.lastName}
                          {...formik.getFieldProps("lastName")}
                        />

                        <FormErrorMessage>
                          {formik.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          formik.touched.email && formik.errors.email
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="email" textStyle="body">
                          Email Address
                        </FormLabel>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="abc@abc.com"
                          borderColor="var(--color-teal)"
                          focusBorderColor="teal.500"
                          value={formik.values.email}
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
                        <FormLabel htmlFor="pass" textStyle="body">
                          Password
                        </FormLabel>
                        <Input
                          id="pass"
                          name="pass"
                          type="password"
                          placeholder="Add a password at least 8 characters"
                          borderColor="var(--color-teal)"
                          focusBorderColor="teal.500"
                          value={formik.values.pass}
                          {...formik.getFieldProps("pass")}
                        />

                        <FormErrorMessage>
                          {formik.errors.pass}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          formik.touched.passwordConfirmation &&
                          formik.errors.passwordConfirmation
                            ? true
                            : false
                        }
                      >
                        <FormLabel
                          htmlFor="passwordConfirmation"
                          textStyle="body"
                        >
                          Confirm password
                        </FormLabel>
                        <Input
                          id="passwordConfirmation"
                          name="passwordConfirmation"
                          type="password"
                          placeholder="Repeat the password"
                          borderColor="var(--color-teal)"
                          focusBorderColor="teal.500"
                          {...formik.getFieldProps("passwordConfirmation")}
                        />

                        <FormErrorMessage>
                          {formik.errors.passwordConfirmation}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="phoneNumber" textStyle="body">
                          Phone Number
                        </FormLabel>
                        <InputGroup>
                          <Input
                            borderColor="var(--color-teal)"
                            focusBorderColor="teal.500"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="3008007044"
                            type="number"
                            {...formik.getFieldProps("phoneNumber")}
                            onBlur={(e) => {
                              formik.getFieldProps("phoneNumber").onBlur(e);
                              console.log("Phone input onBlur triggered");
                              checkPhoneNumber(e.target.value);
                            }}
                          />
                          <InputRightElement>
                            {isCheckingPhone && <Spinner />}
                            {!isCheckingPhone &&
                              !phoneExists &&
                              isSuccess &&
                              !formik.errors.phoneNumber && (
                                <FontAwesomeIcon icon={faCheck} color="green" />
                              )}
                          </InputRightElement>
                        </InputGroup>

                        <FormErrorMessage>
                          {formik.errors.phoneNumber}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={
                          formik.touched.studentId && formik.errors.studentId
                            ? true
                            : false
                        }
                      >
                        <FormLabel htmlFor="studentId" textStyle="body">
                          student id
                        </FormLabel>
                        <InputGroup>
                          <Input
                            id="studentId"
                            name="studentId"
                            type="number"
                            placeholder="Five digits student id"
                            borderColor="var(--color-teal)"
                            focusBorderColor="teal.500"
                            {...formik.getFieldProps("studentId")}
                            onBlur={(e) => {
                              formik.getFieldProps("studentId").onBlur(e);
                              console.log("student id triggered");
                              checkStudentId(e.target.value);
                            }}
                          />
                          <InputRightElement>
                            {isCheckingStudentId && <Spinner />}
                            {!isCheckingStudentId &&
                              studentExists &&
                              studentSuccess &&
                              !formik.errors.studentId && (
                                <FontAwesomeIcon icon={faCheck} color="green" />
                              )}
                          </InputRightElement>
                        </InputGroup>

                        <FormErrorMessage>
                          {formik.errors.studentId}
                        </FormErrorMessage>
                      </FormControl>

                      <Button
                        type="submit"
                        width="full"
                        isLoading={isLoading}
                        loadingText="Submiting"
                        colorScheme="teal"
                        variant="outline"
                        spinnerPlacement="start"
                        isDisabled={isFormValid()}
                      >
                        Submit
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

export default Registration;
