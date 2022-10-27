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

//create a functuion as an arrow function
//const FUNCTIONAME = async (ARGUMENTS) => { CODE };
const addTodo = async ( { userId, title, description, status }) => {
    try{
await addDoc(
    collection(db, "todo"),
    {
        user: userId,
        title: title,
        description: description,
        status: status,
        createdAt: new Date().getTime()

    }
);
    } catch (err) {
        console.log(err);
    }
};
const toggleTodoStatus = async ( { docId, mystatus }) => {
    try {
        //grab a reference to an existing firestore document by id
        const todoRef = doc(db, "todo", docId );
        //update that doc
        await updateDoc( todoRef,
            {
               status :mystatus
            })
    }catch (err) {
        console.log(err);
    }

};

const deleteTodo = async ( docId ) => {
    try {
        //grab a reference to an existing firestore document by id
        const todoRef = doc(db, "todo", docId );
        //update that doc
        await deleteDoc( todoRef);
    }catch (err) {
        console.log(err);
    }
}

export {addTodo, toggleTodoStatus, deleteTodo};