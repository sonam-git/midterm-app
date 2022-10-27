import { Container } from "@chakra-ui/react";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";

export default function AddContactOn() {
return (
<Container maxW="7xl">
<Auth />
<AddContact />
</Container>
);
}
