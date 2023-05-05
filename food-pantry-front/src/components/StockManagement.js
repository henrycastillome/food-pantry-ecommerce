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
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
// import { S3 } from "aws-sdk";
import { ToastContainer, toast } from "react-toastify";
import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

//Function to upload files to aws bucket

async function uploadFileToS3(file, productName) {
  const sanitizedProductName = productName
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();
  const newFileName = `${sanitizedProductName}`;

  const params = {
    Bucket: "food-pantry-ecommerce",
    Key: `products/${newFileName}`,
    ContentType: file.type,
    Body: file,
  };

  try {
    await s3.upload(params).promise();
    console.log("File uploaded successfully");
    return newFileName;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

async function getUrlImage(key) {
  const s3 = new AWS.S3();
  const tenYearsInSeconds = 10 * 365 * 24 * 60 * 60;
  var params = {
    Bucket: "food-pantry-ecommerce",
    Key: `products/${key}`,
    Expires: tenYearsInSeconds,
  };

  var url = s3.getSignedUrl("getObject", params);

  return url;
}

const StockManagement = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const isFormValid = () => {
    return !formik.dirty || !formik.isValid;
  };

  const [isLoading, setIsLoading] = useState(false);

  //resizing image and handle the image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxSize = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            formik.setFieldValue("image", blob);
            setImagePreview(URL.createObjectURL(blob));
          },
          "image/jpeg",
          0.95
        );
      };
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------

  const formik = useFormik({
    initialValues: {
      category: "",
      productName: "",
      quantity: "",
      image: null,
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const uploadedFileName = await uploadFileToS3(
          values.image,
          values.productName
        );
        const imageUrl = await getUrlImage(uploadedFileName);

        const requestBody = {
          productName: values.productName,
          quantity: values.quantity,
          category: values.category,
          imageName: encodeURIComponent(imageUrl),
        };

        const body = JSON.stringify(requestBody);
        const responses = await axios.post(
          "http://localhost/my_php/food-pantry-ecommerce/api/products.php",
          body
        );
        console.log(responses);
        const status = responses.data["status"];
        const message = responses.data["message"];
        if (status === 1) {
          toast.success(
            `${values.productName}, the product has been created successfully`
          );
          formik.resetForm();
        } else {
          toast.error("Error server:", message);
        }

        
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      category: Yup.string().ensure().required("please select one"),
      productName: Yup.string().min(2, "too short").max(50, "too long"),
      quantity: Yup.number()
        .min(1)
        .max(100, "too many")
        .required("please add a quantity"),
      image: Yup.mixed()
        .required("Image is required")
        .test("fileSize", "File Size is too large", (value) => {
          return value && value.size <= 50000000;
        })
        .test("fileType", "Unsupported file type", (value) => {
          return (
            value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          );
        }),
    }),
  });
  return (
    <FullScreenSection
      backgroundColor="white"
      alignItems=""
      spacing={8}
      width="80vw"
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
      <Heading as="h1">Stock Management</Heading>
      <HStack gap={4}>
        <VStack w="100%" alignItems="start" justifyContent="flex-start">
          <Box p={6} rounded="md" w="100%">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
                setImagePreview(null)
              }}
              method="post"
              name="contact"
            >
              <input type="hidden" name="contact" value="contact" />
              <VStack spacing={4}>
                <FormControl
                  isInvalid={
                    formik.touched.category && formik.errors.category
                      ? true
                      : false
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
                    {...formik.getFieldProps("category")}
                  >
                    <option value="Hygiene">Hygiene</option>
                    <option value="Household items">Household items</option>
                    <option value="food">Food</option>
                  </Select>
                  <FormErrorMessage>{formik.errors.category}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.productName && formik.errors.productName
                      ? true
                      : false
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
                  <FormErrorMessage>
                    {formik.errors.productName}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.quantity && formik.errors.quantity
                      ? true
                      : false
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
                  <FormErrorMessage>{formik.errors.quantity}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={
                    formik.touched.image && formik.errors.image ? true : false
                  }
                >
                  <FormLabel htmlFor="quantity">Image</FormLabel>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    border="none"
                    onChange={handleImageUpload}
                  />
                  <FormErrorMessage>{formik.errors.image}</FormErrorMessage>
                </FormControl>
                <Button
                  type="submit"
                  width="full"
                  isDisabled={isFormValid()}
                  isLoading={isLoading}
                  loadingText="Uploading..."
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
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
              ) : (
                <Image
                  src="https://placehold.jp/300x300.png"
                  alt="placeholder"
                  borderRadius="lg"
                />
              )}
              <Stack mt="6" spacing="3">
                <Heading textAlign="center" size="md">
                  {formik.values.productName}
                </Heading>
                <Text textAlign="center">{formik.values.category}</Text>
                <Text textAlign="center" color="teal" fontSize="2xl">
                  Qty in stock: {formik.values.quantity}
                </Text>
              </Stack>
            </CardBody>
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="teal">
                  Order now
                </Button>
                <Button variant="ghost" colorScheme="teal">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </VStack>
      </HStack>
    </FullScreenSection>
  );
};

export default StockManagement;
