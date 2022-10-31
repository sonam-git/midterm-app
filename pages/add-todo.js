import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import Header from "../components/Header";

export default function AddToDo() {
return (
<Container maxW="7xl">
    <Header/>
<Auth />
<AddTodo />
</Container>
);
}


   