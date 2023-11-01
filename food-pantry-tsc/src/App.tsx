import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { CustomerProvider } from './context/CustomerContext';
import Login from './sections/Login';


function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <CustomerProvider>
      <CartProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </CartProvider>
      </CustomerProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
