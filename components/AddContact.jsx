//first react component
//so we can use jsx to make a component to load React
import React from "react";
//add a bunch of Chakra components
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
    InputGroup,
    InputLeftElement,
    AvatarGroup,
    Avatar
} from "@chakra-ui/react";
import { PhoneIcon,EmailIcon  } from "@chakra-ui/icons";
import {
    MdLocationOn,
  } from 'react-icons/md';
//useAuth function, because this page requires authentication
import useAuth from "../hooks/useAuth";
//bring in addTodo from our api
import { addContact } from "../api/contact";


//now let's define a React JSX component
const AddContact = () => {
   //every form control (text input) we want to associate a react state, so it can be updated
    //because we imported the WHOLE REACT OBJECT, we must use React. now
    //React is setting these states with the function (i.e. sets title state with setTitle)
    const [name, setName] = React.useState("");
    const [number, setNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    //useToast pops up a floating message (like, you're not logged in)
    const toast = useToast();
    const { isLoggedIn, user } = useAuth() || {};
    //where does USER come from again? it's the property set by setUser in useAuth()
    //let's define a function that runs to handle the toDo operation
    const handleContactCreate = async () => {
        //are we NOT logged in?
        if (!isLoggedIn) {
            //show a floating alert if we're not logged in
            toast({
            title: "You must be logged in to create a contact",
            status: "error",
            duration: 9000,
            isClosable: true,
            });
            return;
        }   

        //if this code gets run, user is logged in

        setIsLoading(true);
        const contact = {
        name,
        number,
        address,
        email,
        status,
        //we have a field in our templated field set
        userId: user.uid,
        };
        //now we call the addToDo method that has the state values for title,
        //description, status, userID within it.
        //calling our api function that sholuld add a new doc to our firestore collection
        await addContact(contact);
        //once we get past prev line, firestore database is made
        setIsLoading(false);
        setName("");
        setNumber("");
        setAddress("");
        setEmail("");
        setStatus("pending");
        //show a floaty with status update
        toast({ title: "Contact created successfully", status: "success" });
    };
    
    //return the markup for this addContact JSX component (returning the UI)
    return (
        <Box w="50%" margin={"0 auto"} mb=" 20px" display="block" mt={5} minH={'100vh'}>
            <Stack direction="column">
            <InputGroup>
            <InputLeftElement
      pointerEvents='none'>
      <AvatarGroup >
        <Avatar bg='gray.300' size="xs" /></AvatarGroup></InputLeftElement>
      <Input  placeholder="Contact Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />   </InputGroup>
                    <InputGroup>
    <InputLeftElement
      pointerEvents='none'>
    <PhoneIcon color='black.300' /></InputLeftElement>
    <Input type='tel' placeholder='Phone number'
     value={number}
     onChange={(e) => setNumber(e.target.value)} />
    </InputGroup>

    <InputGroup>
    <InputLeftElement
      pointerEvents='none'>
      <MdLocationOn color='black.300' /></InputLeftElement>
    <Input type='text' placeholder='Address'
     value={address}
     onChange={(e) => setAddress(e.target.value)} />          
    </InputGroup>
                          
     <InputGroup>
    <InputLeftElement
      pointerEvents='none'>
      <EmailIcon color='black.300' /></InputLeftElement>
    <Input type='text' placeholder='Email'
     value={email}
     onChange={(e) => setEmail(e.target.value)} />
    </InputGroup>
                     
                <Button
                
                    onClick={() => handleContactCreate()}
                   
                    disabled={name.length < 1 || number.length < 1 || address.length < 1 || email.length < 1 ||  isLoading}
                   
                    colorScheme="green"
                    variant="solid"
                >
                Add Contact
                </Button>
            </Stack>
        </Box>
    );
};

export default AddContact;