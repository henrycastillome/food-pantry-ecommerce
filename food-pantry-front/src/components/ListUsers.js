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
  Box
} from "@chakra-ui/react";
import axios from "axios";
import { SearchBar } from "./SearchBar";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [elementSearch, setElementSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [userSearch, setUserSearch]=useState([])

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios
      .get("https://food-pantry.herokuapp.com/users.php")
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      });
  }
  

  const handleSearch = () => {
    setIsSearch(true)
    console.log(elementSearch);
    const searchWords = elementSearch.split(" ");
    setUserSearch(users.filter((element) =>
      Object.values(element).some((value) =>
        searchWords.some((word) =>
          value.toString().toLowerCase().includes(word.toLowerCase())
        )
      )
    ));

    console.log(userSearch);
  };

  return (
 <>
     <Box pb={4} pt={4}> 
      <SearchBar
        onChange={(e) => setElementSearch(e.target.value)}
        onClick={handleSearch}
        
      />
      </Box>

      <TableContainer>
        <Table variant="simple">
          <TableCaption> All Users</TableCaption>

          <Thead>
            <Tr>
              <Th>User Id</Th>
              <Th> User Name</Th>
              <Th> User Last Name</Th>
              <Th>User email</Th>
              <Th>User Phone</Th>
              <Th> Student id</Th>
            </Tr>
          </Thead>
          {isSearch ? (
            <Tbody>
              {userSearch.map((user, index) => (
                <Tr key={index}>
                  <Td>{user.user_id}</Td>
                  <Td>{user.user_name}</Td>
                  <Td>{user.user_lname}</Td>
                  <Td>{user.user_email}</Td>
                  <Td>{user.user_phone}</Td>
                  <Td>{user.student_id}</Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              {users.map((user, index) => (
                <Tr key={index}>
                  <Td>{user.user_id}</Td>
                  <Td>{user.user_name}</Td>
                  <Td>{user.user_lname}</Td>
                  <Td>{user.user_email}</Td>
                  <Td>{user.user_phone}</Td>
                  <Td>{user.student_id}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      </>
  );
};

export default ListUsers;
