import React from "react";
import { useState} from 'react';
import { ArrowBackIcon,CalendarIcon } from '@chakra-ui/icons'
import {
    Box,
    Stack,
    Input,
    Button,
    useToast,
    Link,
    InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import  Auth  from '../../components/Auth';
import {
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";
import { db } from "../../firebase";
//define the jsx component to show just one single to do in our ui
 const EventItem = ({itemData}) => {
//enforce user login
const [inputEventName, setEventName] = useState(itemData.eventname);
    const [inputEventDate, setEventDate] = useState(itemData.eventdate);
    const toast=useToast();
const {user}= useAuth() || {};
if (!user) {
    return;
}
//update eventlist
const editEvent = async (itemData) => {
       
    const docRef =  await doc(db, 'event', itemData.id);
    console.log(docRef);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    if(docSnap.exists()){
        console.log(inputEventName)
        const newData = {
            eventname: inputEventName,
            eventdate: inputEventDate
        }
        setDoc(docRef, newData, {merge:true})
        .then(docSnap =>{
            toast({
                //reverse apostrophes let us have variables in the format. it will spit out what's in newStatus after title
                title: 'Event have been updated successfully',
                status:'success'
            });
        })
        .catch(error => {
            console.log(error);
        })
    }

};


return (
<>
<Box ml="5"><Auth/></Box>
< Box w="50%" margin={"0 auto"} display="block" mt={5}>
        <Stack direction="column">
        <Box
  as="button"
  p={2}
  color="white"
  fontWeight="bold"
  borderRadius="md"
  bgGradient="linear(to-r, teal.500,green.500)"
  _hover={{
    bgGradient: "linear(to-r, red.500, yellow.500)",
  }}
>
<Link href="/"><ArrowBackIcon/>{" "}Back To Home</Link>
</Box>
    
      <Input type="text" value={inputEventName} onChange={(e) => setEventName(e.target.value)} placeholder=" Name" />
      <InputGroup>
    <InputLeftElement
      pointerEvents='none'>
      <CalendarIcon color='gray.300' /></InputLeftElement>
      <Input type="date" value={inputEventDate} onChange={(e) => setEventDate(e.target.value)} placeholder="date" /> </InputGroup>
      <Button
        onClick={() => editEvent(itemData)}
       colorScheme= "green"
       variant="solid"
        >
        Update Event
      </Button>
    </Stack>
    </Box>
</>
);
};

 //define the REQUIRED getServerSideProps() function that Next.js will call 
 //when it gets a dynamically-routed URL: /todo/blah <- here the id will = blah
 export async function getServerSideProps(context){
    //if we want to get the url parameter that next.js set for the id value
    //we will look inside context at the params object, and get the property
    //name out of there
    
        let itemData = null; //this is in case it doesn't find a record
        //get a doc from firestore
        const docRef = doc(db, 'event', context.params.id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            itemData = docSnap.data();
            itemData.id= context.params.id;
            console.log("docSnap exists!");
        }

        return{
            props: {
                itemData
            }
        };
    };
export default EventItem;