import { Box, Container } from "@chakra-ui/react";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AddContactOn() {
return (
<Container maxW="7xl" bgGradient='linear(to-r, green.200, pink.500)' >
<Header/>
<Auth/>
<AddContact />
<Footer/>
</Container>
);
}
