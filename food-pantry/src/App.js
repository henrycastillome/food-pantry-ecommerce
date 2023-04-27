
import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import { ChakraProvider } from '@chakra-ui/react'
import Login from './components/Login';
import StockManagement from './components/StockManagement';

function App() {
  return (
    <ChakraProvider>
      <main>
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stockmanagement" element={<StockManagement />} />

        </Routes>
        



      </main>
    
    </ChakraProvider>
  );
}

export default App;
