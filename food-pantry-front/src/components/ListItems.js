import React, { useEffect, useState } from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Avatar,
  TableContainer,
  WrapItem,
  Button,
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import axios from "axios";
import AWS from "aws-sdk";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const ListItems = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios
      .get("http://localhost/my_php/food-pantry-ecommerce/api/inventory.php")
      .then(function (response) {
        console.log(response.data);
        setProducts(response.data);
      });
  }

  const handleDelete = (id) => {
   
      axios
        .delete(
          ` http://localhost/my_php/food-pantry-ecommerce/api/products.php/${id}/delete`
        )
        .then(function (response) {
          console.log(response.data);
          getProducts();

     
        });
    } 

  if (!products.length)
    return <FullScreenSection> Loading.....</FullScreenSection>;

  return (
    <FullScreenSection
      backgroundColor="white"
      alignItems=""
      spacing={8}
      width="90vw"
      pr={{ base: 8, md: 32 }}
      pl={{ base: 8, md: 32 }}
      pt={{ base: 8, md: 32 }}
      pb={{ base: 32, md: 32 }}
    >
      <Heading as="h1"> List of Items </Heading>

      <TableContainer>
        <Table variant="simple">
          <TableCaption> All products</TableCaption>

          <Thead>
            <Tr>
              <Th>Item ID</Th>
              <Th>Item Name</Th>
              <Th>Category</Th>
              <Th> Quantity</Th>
              <Th> Image</Th>
              <Th> Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={index}>
                <Td>{product.item_id}</Td>
                <Td>{product.item_name}</Td>
                <Td>{product.item_category}</Td>
                <Td>{product.item_quantity}</Td>

                <Td>
                  <WrapItem>
                    <Avatar
                      size="md"
                      name={product.item_name}
                      src={decodeURIComponent(product.item_image)}
                    />
                  </WrapItem>
                </Td>
                <Td>
                  <Button onClick={()=>handleDelete(product.item_id)}>
                    <FontAwesomeIcon icon={faTrash} />{" "}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </FullScreenSection>
  );
};

export default ListItems;
