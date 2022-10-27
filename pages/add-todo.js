import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";

export default function AddToDo() {
return (
<Container maxW="7xl">
<Auth />
<AddTodo />
</Container>
);
}


   