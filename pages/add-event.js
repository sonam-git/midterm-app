import { Container } from "@chakra-ui/react";
import AddEvent from "../components/AddEvent";
import Auth from "../components/Auth";
import Header from "../components/Header"

export default function AddEventOn() {
return (
<Container maxW="7xl">
<Header/>
<Auth />
<AddEvent />
</Container>
);
}
