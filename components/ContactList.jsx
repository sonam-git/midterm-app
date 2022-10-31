import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
    Link,
    HStack,
    Avatar
    } from "@chakra-ui/react";
    import React, { useEffect} from "react";
    import useAuth from "../hooks/useAuth";
    //onSnapshot is when firestore sends back data
    //query is a search method, where is setting up criteria for that query
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import { db } from "../firebase";
    import { FaToggleOff, FaToggleOn, FaEdit, FaTrash } from "react-icons/fa";
    import { deleteContact, toggleContactStatus} from "../api/contact";
    import { MdLocationOn } from 'react-icons/md';
    import { PhoneIcon ,EmailIcon} from '@chakra-ui/icons';
    

    

    
    const ContactList = () => {
        const [contact, setContact] = React.useState([]);
        const {  user } = useAuth() || {};
        const toast = useToast();
        // a nested function that does the work of updating the list from
        //firestore data
        const refreshData = () => {

        };

        useEffect(() => {
            if (!user) {
                setContact([]);
                return;
            }
            //if our code continues execution here, a user is logged in
            // query on firestore collection. first we pass a reference to
            //the collection() passing db global (referring to our database)
            //and the collection name "todo". 
            //Now, where (field name, string to define comparison, comparee)
            //every document in this todo collection is going to have a field
            //query is async and a value object
            const q = query(collection(db, "contact"), where("user", "==", user.uid));
            
            const s = 
            //this is an event handler with firebase, called on snapshot q is query
            //we issues, second method is another arrow function
            //it will wait for query q to be complete. when it's complete,
            //it will give me the querySnapshot
            onSnapshot(q, (querySnapshot) => {
                //in this function we have all the results from q in querySnapshot
                let ar = [];
                //loop thru each doc in result
                querySnapshot.docs.forEach((doc) => {
                    //ar will fill up with object values that have two properties
                    //... means if doc.data returns anything, we'll capture that
                    ar.push({ 
                        id: doc.id, ...doc.data() 
                    });
                    });
                //once we loop through using forEach and have array of docs in ar
                //When setTodos gets called, update the entire component
                setContact(ar);
            });
            refreshData();
        }, 
        [user]
        );

        const handleContactDelete = async (id) => {
            if (confirm("Are you sure you want to delete this Contact?")) {
                deleteContact(id);
                toast({ title: "Contact deleted successfully", status: "success" });
            }
        };

        const handleToggle = async (id, status) => {
            const newStatus = status == "completed" ? "pending" : "completed";
            await toggleContactStatus({ docId: id, status: newStatus });
            toast({
                title: `Contact marked ${newStatus}`,
                status: newStatus == "completed" ? "success" : "warning",
            });
        };

        //FINALLY WE CAN DEFINE THE JSX FOR OUR COMPONENT
        //WE ARE LOOPING THROUGH THE ARRAY THAT CAME BACK TO US IN THE TO DOS
        return (
           
            <Box mt={5}>
                   <Heading  pb="3px" mb="3px" fontSize={['1.4em', '1.4em', '1.4em', '1.6em', '1.8em']}>Contact List</Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                { contact &&
                contact.map((contact) => (
                    <Box bg="gray.400"
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                        key = {contact.id}
                        >
                        <Heading as="h3" fontSize={"xl"}>
                            {contact.title}{" "}
                            <HStack float="right">
                            <Badge
                                color="red.500"
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={() => handleContactDelete(contact.id)}
                                >
                                <FaTrash size="15px"/>
                            </Badge>

                            <Badge color="green" bg='black.200'>
                            <Link href={`/contact/${contact.id}`}><FaEdit size="15px" />  </Link> 
                        </Badge>
                        </HStack>
                        </Heading>
                        <Heading as="h3" fontSize={"xl"}>
                        <Text>{contact.name}</Text>
                        </Heading>
                        <Text>{<PhoneIcon color="#1970F1" size="20px" />}{" "}{contact.number}</Text>
                        <Text>{<EmailIcon color="#1970F1" size="20px" />}{" "}{contact.email}</Text>
                        <HStack>
                        <Text>{<MdLocationOn color="#1970F1" size="20px" />}</Text>
                         <Text>{contact.address}</Text>
                        </HStack>
                        
                        
                        <Badge
                                    color={contact.status == "pending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(contact.id, contact.status)}
                                >
                                    {contact.status == "pending" ? <FaToggleOff size="15px" /> : <FaToggleOn size="15px"/>}
                                </Badge>
                                <Badge float="right" opacity="0.8" bg={contact.status == "pending" ? "yellow.500" : "green.500"}>
                                    {contact.status}
                                </Badge>
                    </Box>
                ))}
                </SimpleGrid>
            </Box>
            );
    };
    export default ContactList;