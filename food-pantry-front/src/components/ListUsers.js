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
  TableContainer,
} from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
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
      .get("http://localhost/my_php/food-pantry-ecommerce/api/users.php")
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

  if (!users.length || !userSearch.length )
    return <FullScreenSection> Loading.....</FullScreenSection>;
  return (
    <FullScreenSection
      backgroundColor="white"
      alignItems=""
      spacing={8}
      width="100vw"
      pr={{ base: 8, md: 32 }}
      pl={{ base: 8, md: 32 }}
      pt={{ base: 8, md: 32 }}
      pb={{ base: 32, md: 32 }}
    >
      <Heading as="h1"> List of Users </Heading>
      <SearchBar
        onChange={(e) => setElementSearch(e.target.value)}
        onClick={handleSearch}
      />

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
                  <Td>{user.stu_id}</Td>
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
                  <Td>{user.stu_id}</Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </FullScreenSection>
  );
};

export default ListUsers;
