import { Box, Container } from "@chakra-ui/react";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";
import Header from "../components/Header"

export default function AddContactOn() {
return (
<Container maxW="7xl" >
    <Header/>
<Auth/>
<AddContact />
</Container>
);
}
