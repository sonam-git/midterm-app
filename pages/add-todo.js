import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AddToDo() {
return (
<Container maxW="7xl" bgGradient='linear(to-r, green.200, pink.500)'>
<Header/>
<Auth />
<AddTodo />
<Footer/>
</Container>
);
}


   