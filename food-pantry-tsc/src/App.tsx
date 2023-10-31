import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <ChakraProvider>
      <CartProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
