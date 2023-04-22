import React, { useState } from "react";
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
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import axios from "axios";

const ContactForm = () => {
  const phoneRegExp = /^(?:\+?\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/;
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      studentId: "",
    },
    onSubmit: async (values) => {
      try {
        const body = JSON.stringify(values);
        const response = await axios.post(
          "http://localhost/my_php/food-pantry-ecommerce/api/index.php",
          body
        );

        if (response.status === 200) {
          alert("success");
          window.location.href='https://www.pratt.edu';
        } else {
          console.error("Error server:", response.statusText);
        }
      } catch (error) {
        console.error("ErrorCatch:", error);
        alert("something went wrong, try again later");
      }
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
      phoneNumber: Yup.string()

        .matches(phoneRegExp, "Phone is not valid")
        .required("Required"),

      studentId: Yup.string()
        .required("Required")
        .matches(/^\d{5}$/, "Must be exactly 5 numbers"),
      //     ,
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
      <Heading as="h1" id="contactme-section">
        Registration Form
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
                  borderColor="blue"
                  borderWidth="2px"
                  focusBorderColor=""
                  {...formik.getFieldProps("firstName")}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />

                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
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
                  borderColor=""
                  borderWidth="2px"
                  focusBorderColor=""
                  {...formik.getFieldProps("lastName")}
                />

                <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              >
                <FormLabel htmlFor="email" textStyle="body">
                  Email Address
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  borderColor=""
                  borderWidth="2px"
                  focusBorderColor=""
                  {...formik.getFieldProps("email")}
                />

                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? true
                    : false
                }
              >
                <FormLabel htmlFor="phoneNumber" textStyle="body">
                  Phone Number
                </FormLabel>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="number"
                  borderColor=""
                  borderWidth="2px"
                  focusBorderColor=""
                  {...formik.getFieldProps("phoneNumber")}
                />

                <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
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
                <Input
                  id="studentId"
                  name="studentId"
                  type="number"
                  borderColor=""
                  borderWidth="2px"
                  focusBorderColor=""
                  {...formik.getFieldProps("studentId")}
                />

                <FormErrorMessage>{formik.errors.studentId}</FormErrorMessage>
              </FormControl>

              <Button type="submit" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default ContactForm;
