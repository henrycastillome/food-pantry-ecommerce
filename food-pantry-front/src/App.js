
import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './components/Login';
import InventoryManagement from './pages/InventoryManagement';
import HomePage from "./pages/HomePage"
import AdminLogin from './components/AdminLogin';
import { AuthProvider} from './context/AuthContext';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import { NewProvider } from './context/NewOrder';

function App() {
  
  return (
    <ChakraProvider>
      <AuthProvider>
        <NewProvider>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/inventory" element={<InventoryManagement />} />
         
          <Route path="/admin" element={<AdminLogin />} />

        </Routes>
        



      </main>
      </NewProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;