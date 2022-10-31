import React from 'react';
import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
import ContactList from "../components/ContactList";
import Header from "../components/Header";
import Footer from "../components/Footer"


export default function Home() {
  
  return ( 
  <Container maxW="7xl" borderRadius="md"  bgGradient='linear(to-r, green.200, pink.500)'>
  <Header />
  <TodoList />
  <EventList/>
  <ContactList />
  <Footer/>
  </Container>
 
  );
  }