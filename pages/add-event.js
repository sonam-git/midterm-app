import { Container } from "@chakra-ui/react";
import AddEvent from "../components/AddEvent";
import Auth from "../components/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AddEventOn() {
return (
<Container maxW="7xl" bgGradient='linear(to-r, green.200, pink.500)'>
<Header/>
<Auth />
<AddEvent />
<Footer/>
</Container>
);
}
