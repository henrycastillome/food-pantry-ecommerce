import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Spinner,
  
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import axios from "axios";
import AWS from "aws-sdk";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";


AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    axios
      .get("https://food-pantry.herokuapp.com/listOrders.php")
      .then(function (response) {
        console.log(response.data);
        setOrders(response.data);
      });
  }

  const [isDeleting, setIsDeleting] = useState(false);
  






  const handleDelete = (id) => {
    setIsDeleting(true);
    console.log(isDeleting);
    axios
      .delete(
        ` https://food-pantry.herokuapp.com/listOrders.php/${id}/delete`
      )
      .then(function (response) {
        console.log(response.data);
        
        getOrders();
        setIsDeleting(false);
      });
      toast.success("Deleted succesfully")
  };

  if (!orders.length)
    return <FullScreenSection> Loading.....</FullScreenSection>;

  return (
    <>
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
      <TableContainer>
        <Table variant="simple">
          <TableCaption> All products</TableCaption>

          <Thead>
            <Tr>
              <Th>Order id</Th>
              <Th>User Name</Th>
              <Th>Created at </Th>
              <Th> Items  & Quantity</Th>
              <Th> Student id</Th>
              <Th> Remove</Th>
             
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order, index) => (
              <Tr key={index}>
                <Td>{order.orders_id}</Td>
                <Td>{order.user_full_name}</Td>
                <Td>{order.created_at}</Td>
                <Td>{order.items_and_quantities}</Td>
                <Td>{order.student_id}</Td>
                
                

                
              
               
                <Td>
                  <Button onClick={() => handleDelete(order.orders_id)}>
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

export default ListOrders;
