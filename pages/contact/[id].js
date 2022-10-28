import React, { useState} from 'react';
import {
    Box,
    Stack,
    Input,
    Button,
    useToast
} from "@chakra-ui/react";
import  Auth  from '../../components/Auth';
//import firebase from "../../firebase"
import {doc, getDoc, setDoc} from "firebase/firestore";
import { db } from "../../firebase";
import useAuth from '/hooks/useAuth';



const ContactItem = ({itemData}) =>{
    //enforce user login
    //we should get a user object back from useAuth
    const [inputName, setName] = useState(itemData.name);
    const [inputNum, setNum] = useState(itemData.number);
    const [inputAdd, setAdd] = useState(itemData.address);
    const [inputEmail, setMail] = useState(itemData.email);
    const toast=useToast();
    
    const {user} = useAuth() || {};
    if (!user){
        return;
    }
//update contactlist
    const editContact = async (itemData) => {
       
        const docRef =  await doc(db, 'contact', itemData.id);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);
        if(docSnap.exists()){
            console.log(inputName)
            const newData = {
                name: inputName,
                number: inputNum,
                address:inputAdd,
                email: inputEmail
            }
            setDoc(docRef, newData, {merge:true})
            .then(docSnap =>{
                toast({
                    //reverse apostrophes let us have variables in the format. it will spit out what's in newStatus after title
                    title: 'Contact have been updated successfully',
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
    
    <Box Box w="50%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
        
          <Input type="text" value={inputName} onChange={(e) => setName(e.target.value)} placeholder=" Name" />
          <Input type="number" value={inputNum} onChange={(e) => setNum(e.target.value)} placeholder="Number" />
          <Input type="text" value={inputAdd} onChange={(e) => setAdd(e.target.value)} placeholder="Address" />
          <Input type="text" value={inputEmail} onChange={(e) => setMail(e.target.value)} placeholder="Email" />
          <Button
            onClick={() => editContact(itemData)}
           colorScheme= "green"
           variant="solid"
            >
            Update Contact
          </Button>
        
        </Stack>
        </Box>
       
    </>
  );
};

//define the REQUIRED getServerSideProps function that NEXTJS will
//call whenever it gets a dynamically routed URL .. this is
//any url that looks like /todo/blahblahblah <- here the id = blah
//.. whatever comes after that
//slash is going to be dynamically routed
//nextJS passes a parameter to us. our function will receive everything
//it needs to know from context variable

export async function getServerSideProps(context){
    //if we want to get the url parameter that next.js set for the id value
    //we will look inside context at the params object, and get the property
    //name out of there
    
        let itemData = null; //this is in case it doesn't find a record
        //get a doc from firestore
        const docRef = doc(db, 'contact', context.params.id);
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
export default ContactItem;