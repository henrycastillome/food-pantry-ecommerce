import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      
    </ChakraProvider>
  );
}

export default App;
