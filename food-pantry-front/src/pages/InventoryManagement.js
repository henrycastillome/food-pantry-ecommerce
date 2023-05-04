import { useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  List,
} from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import ListItems from "../components/ListItems";
import ListUsers from "../components/ListUsers";
import { SearchBar } from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import AdminLogin from "../components/AdminLogin";
import StockManagement from "../components/StockManagement";
import NavBarAdmin from "../components/NavBarAdmin";

const InventoryManagement = () => {
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

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
      {isAuthenticated ? (
        <>
          <NavBarAdmin user={user} />
          <Tabs isFitted variant="enclosed" colorScheme="teal">
            <TabList>
              <Tab>List Items</Tab>
              <Tab>List users</Tab>
              <Tab backgroundColor="teal" color="white">
                Add new item
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ListItems />
              </TabPanel>
              <TabPanel>
                <ListUsers />
              </TabPanel>

              <TabPanel>
                <StockManagement />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <AdminLogin />
      )}
    </FullScreenSection>
  );
};

export default InventoryManagement;
