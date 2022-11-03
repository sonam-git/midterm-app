import { Badge, Box, Heading, SimpleGrid, Text, useToast,Link,HStack,Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
import { deleteEvent, toggleEventStatus} from "../api/event";
import { CalendarIcon } from '@chakra-ui/icons'

const EventList = () => {
    const [events, setEvents] = React.useState([]);
    const { user } = useAuth() || {};
    const toast = useToast();
    useEffect(
        () => {
            const refreshData = () => {
                if (!user) {
                    setEvents([]);
                    return;
                }
                const q = query(collection(db, "event"), where("user", "==", user.uid));
                onSnapshot(q, (querySnapchot) => {
                    let ar = [];
                    querySnapchot.docs.forEach((doc) => {
                        ar.push({ id: doc.id, ...doc.data() });
                    });
                    setEvents(ar);
                });
            };

        refreshData();
    },
     [user]
    );
  
    const handleEventDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this event?")) {
            deleteEvent(id);
            toast({ title: "Event deleted successfully", status: "success" });
        }
    };
    
   
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleEventStatus({ docId: id, status: newStatus });
        toast({
            title: `Event marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };
    return (
        <Box mt={5} minH={'100vh'}>
             <Button size='lg' colorScheme='green' mb={5}><Heading  pb="3px"  mb="3px" fontSize={['1.4em', '1.4em', '1.4em', '1.6em', '1.8em']}>Event List</Heading></Button>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {events &&
                    events.map((event) => (
                        <Box p={3} bg="gray.400" boxShadow="2xl" shadow={"dark-lg"} transition="0.2s" _hover={{ boxShadow: "sm" }} key={event.id}>
                            <Heading as="h3" fontSize={"xl"}>
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
                                    onClick={() => handleEventDelete(event.id)}
                                ><FaTrash size="15px" />
                                </Badge> 

                                <Badge color="green" bg='black.200'>
                            <Link href={`/event/${event.id}`}>  <FaEdit size="15px"/> </Link> 
                        </Badge>
                                </HStack>
                                   
                        <Text>{event.eventname}</Text>
                        </Heading>
                        <Text>{<CalendarIcon/>}{" "}{event.eventdate}</Text>
                        
                        
                                    
                                <Badge
                                    color={event.status == "pending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(event.id, event.status)}
                                >
                                    {event.status == "pending" ? <FaToggleOff size="15px"/> : <FaToggleOn size="15px" />}
                                </Badge>
                                <Badge float="right" opacity="0.8" bg={event.status == "pending" ? "yellow.500" : "green.500"}>
                                    {event.status}
                                </Badge>
                            
        
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};
export default EventList;
