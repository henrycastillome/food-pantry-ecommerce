
import * as React from 'react'
import './App.css';
import ContactForm from './components/ContactForm';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
    <ContactForm />
    </ChakraProvider>
  );
}

export default App;
