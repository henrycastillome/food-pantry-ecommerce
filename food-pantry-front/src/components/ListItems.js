import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Avatar,
  TableContainer,
  WrapItem,
  Button,
  Spinner,
  Input,
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import axios from "axios";
import AWS from "aws-sdk";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const ListItems = () => {
  const {products, setProducts, getProducts} = useAuthContext()
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editText, setEditText] = useState(null);
  const [editValue, setEditValue] = useState({});

  useEffect(() => {
    if (editText === null) return;
    setEditValue(products.find((item) => item.item_id === editText));
  }, [editText, products]);

  const handleEdit = (item_id) => {
    setEditText(item_id);
  };

  const handleSave = (id) => {
    setIsSaving(true);
    axios
      .put(
        ` https://food-pantry.herokuapp.com/products.php/${id}/put`,
        editValue
      )
      .then(function (response) {
        const success = response.data["status"];
        console.log(response.data);
        if (success === 1) {
          toast.success("item updated successfully");
          getProducts();
        } else {
          toast.error("error updating the item");
        }
        setIsSaving(false);
      });
    const updatedData = products.map((item) =>
      item.item_id === editText ? editValue : item
    );
    setProducts(updatedData);
    setEditText(null);
  };

  

  const handleDelete = (id) => {
    setIsDeleting(true);
    console.log(isDeleting);
    axios
      .delete(
        `https://food-pantry.herokuapp.com/products.php/${id}/delete`
      )
      .then(function (response) {
        console.log(response.data);
        getProducts();
        setIsDeleting(false);
      });
  };

  if (!products.length)
    return <FullScreenSection> Loading.....</FullScreenSection>;

  return (
    <>
   
     
     

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
              <Th> Last update</Th>
              <Th> Edit</Th>
              <Th> Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={index}>
                <Td>{product.item_id}</Td>
                <Td>{product.item_name}</Td>
                <Td>{product.item_category}</Td>
                <Td>
                  {editText === product.item_id ? (
                    <Input
                      value={editValue.item_quantity || ""}
                      onChange={(e) =>
                        setEditValue({
                          ...editValue,
                          item_quantity: e.target.value,
                        })
                      }
                    />
                  ) : (
                    product.item_quantity
                  )}
                </Td>

                <Td>
                  <WrapItem>
                    <Avatar
                      size="md"
                      name={product.item_name}
                      src={decodeURIComponent(product.item_image)}
                    />
                  </WrapItem>
                </Td>
                <Td>{product.last_modified}</Td>
                <Td>
                  {editText === product.item_id ? (
                    <Button
                      spinnerPlacement="start"
                      isLoading={isSaving}
                      loadingText="Saving...."
                      onClick={() => handleSave(product.item_id)}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button onClick={() => handleEdit(product.item_id)}>
                      Edit
                    </Button>
                  )}
                </Td>
                <Td>
                  <Button onClick={() => handleDelete(product.item_id)}>
                    {isDeleting ? (
                      <Spinner />
                    ) : (
                      <FontAwesomeIcon icon={faTrash} />
                    )}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListItems;
