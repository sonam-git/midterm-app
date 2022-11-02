import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import Header from "../components/Header";
import ContactList from "../components/ContactList";
import Footer from "../components/Footer";
export default function AddToDo() {
return (
<Container maxW="7xl" bgGradient='linear(to-r, green.200, pink.500)'>
    <Header/>
<Auth />
  <ContactList />
  <Footer/>
</Container>
);
}