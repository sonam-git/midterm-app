import { useEffect, useState } from "react";
import { auth } from "../firebase";

//react hooks
const useAuth = () => {
const [user, setUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(
    //pass an arrow function to react's useEffect () method
    () => {
        //if the state of auth changed...
auth.onAuthStateChanged(
    //pass another anon function to firebase's onAuthStateChanged ()
    (user) => {
        //with the user object value that firebase returns,set react states
        // // if there is a user and the user has an id
setIsLoggedIn(user && user.uid ? true : false);
// set react state variable user
setUser(user);
}
);
}
);
return { user, isLoggedIn };
};
//let other files in the app import this function
export default useAuth;