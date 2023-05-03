
import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './components/Login';
import StockManagement from './components/StockManagement';
import ListItems from './components/ListItems';
import ListUsers from './components/ListUsers';
import InventoryManagement from './pages/InventoryManagement';
import AdminLogin from './components/AdminLogin';
import { AuthProvider} from './context/AuthContext';

function App() {
  
  return (
    <ChakraProvider>
      <AuthProvider>
      <main>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stockmanagement" element={<StockManagement />} />
          <Route path="/listitems" element={<ListItems />} />
          <Route path="/listusers" element={<ListUsers />} />
          
          <Route path="/inventory" element={<InventoryManagement />} />
         
          <Route path="/admin" element={<AdminLogin />} />

        </Routes>
        



      </main>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;