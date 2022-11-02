import React from 'react';
import { Box, Container, Stack,  Heading} from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";


export default function Home() {
  
  return ( 
  <Container maxW="7xl" borderRadius="md"  bgGradient='linear(to-r, green.200, pink.500)' >
    
  <Header />
  <Hero/>
  <Footer/>
  
  </Container>
 
  );
  }