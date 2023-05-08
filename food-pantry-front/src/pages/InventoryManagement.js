import { useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  
} from "@chakra-ui/react";
import FullScreenSection from "../components/FullScreenSection";
import ListItems from "../components/ListItems";
import ListUsers from "../components/ListUsers";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import StockManagement from "../components/StockManagement";
import NavBarAdmin from "../components/NavBarAdmin";
import { MdAddCircleOutline  } from "react-icons/md"
import ListOrders from "../components/ListOrders";


const Redireect=()=>{
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/admin')
  },[navigate])
  return null
}

const InventoryManagement = () => {
  const { user, isAuthenticated } = useAuthContext();
  



  return (
    <>
    {isAuthenticated  ? (
      <FullScreenSection
    p={16}
    width="100vw"
    minHeight="100vh"
    backgroundColor="var(--color-white)"
    pt={48}
    >
   
          <NavBarAdmin user={user} />
          <Tabs isFitted size='md' variant="soft-rounded" colorScheme="teal">
            <TabList>
              <Tab> List Orders</Tab>
              <Tab>List Items</Tab>
              <Tab>List users</Tab>
              <Tab backgroundColor="teal" color="white">
              {<MdAddCircleOutline />} Add new item
              </Tab>
            </TabList>

            <TabPanels >
              <TabPanel>
                <ListOrders />
              </TabPanel>
              <TabPanel>
                <ListItems />
              </TabPanel>
              <TabPanel>
                <ListUsers />
              </TabPanel>

              <TabPanel  >
                <StockManagement />
              </TabPanel>
            </TabPanels>
          </Tabs>
        
      
    </FullScreenSection>

    ):<Redireect /> }
    
    </>
  );
};

export default InventoryManagement;
