//this js file in our/ api directory has code to interact with firestore db
import { db } from "../firebase";
//now we can import variety of function from the firebase sdk
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc
} from "firebase/firestore";

//create a function as an arrow function
//const FUNCTIONAME = async (ARGUMENTS) => { CODE };
const addEvent = async ( { userId, eventname, eventdate, status }) => {
    try{
await addDoc(
    collection(db, "event"),
    {
        user: userId,
        eventname: eventname,
        eventdate: eventdate,
        status: status,
        createdAt: new Date().getTime()

    }
);
    } catch (err) {
        console.log(err);
    }
};

const toggleEventStatus = async ( { docId, status }) => {
    try {
        //grab a reference to an existing firestore document by id
        const eventRef = doc(db, "event", docId );
        //update that doc
        await updateDoc( eventRef,
            {
                status 
            })
    }catch (err) {
        console.log(err);
    }

};


//edit event
const editEvent = async (docId) => {
    const docRef = doc(db, 'event', docId);

    const data = {
        user: "userId",
        name: "eventname",
        eventdate:eventdate.toDate().toDateString(),
      };

    setDoc(docRef, data, {merge:true})
    .then(docRef => {
        console.log("Document has been updated successfully");
    })
    .catch(error => {
        console.log("error");
    });
    };

const deleteEvent = async ( docId ) => {
    try {
        //grab a reference to an existing firestore document by id
        const eventRef = doc(db, "event", docId );
        //update that doc
        await deleteDoc( eventRef);
    }catch (err) {
        console.log(err);
    }
}

export {addEvent, toggleEventStatus, deleteEvent, editEvent};