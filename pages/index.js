import React from 'react';
import { Box, Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import EventList from "../components/EventList";
import ContactList from "../components/ContactList";
import AppFooter from "../components/AppFooter";

export default function Home() {
  
  return ( 
  <Container maxW="7xl" borderRadius="md" >
    <Auth /> 
  <TodoList />
  <EventList/>
  <ContactList />
  <AppFooter/>
  </Container>
  );
  }