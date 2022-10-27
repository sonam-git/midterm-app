import { Container } from "@chakra-ui/react";
import AddEvent from "../components/AddEvent";
import Auth from "../components/Auth";

export default function AddEventOn() {
return (
<Container maxW="7xl">
<Auth />
<AddEvent />
</Container>
);
}
