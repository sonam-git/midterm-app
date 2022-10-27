import React from "react";
import { Box, Button, Link, Text, useColorMode, Wrap,Stack ,WrapItem} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";


const Auth = () => {
const { toggleColorMode, colorMode } = useColorMode();
const { isLoggedIn, user } = useAuth() || {};
const handleAuth = async () => {
const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
.then((result) => {
// This gives you a Google Access Token. You can use it to access the Google API.
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
// The signed-in user info.
const user = result.user;
// ...
})
.catch((error) => {
// Handle Errors here.
const errorCode = error.code;
const errorMessage = error.message;
// The email of the user's account used.
const email = error.customData.email;
// The AuthCredential type that was used.
const credential = GoogleAuthProvider.credentialFromError(error);
// ...
});
};
return (
  <Stack direction='column' paddingY="10">
<Wrap spacing={4}>
    <WrapItem>
    <Link href="/add-todo">
      <Button size='md'
  height='48px'
  width='200px'
  border='2px'
  borderColor='green.500'>Add To Do</Button></Link>
    </WrapItem>

    <WrapItem>
    <Link href="/">
      <Button size='md'
  height='48px'
  width='200px'
  border='2px'
  borderColor='green.500'>All Files</Button></Link>
    </WrapItem>

    <WrapItem>
    <Link href="/add-event">
      <Button size='md'
  height='48px'
  width='200px'
  border='2px'
  borderColor='green.500'>Add Event</Button></Link>
    </WrapItem>

    <WrapItem>
    <Link href="/add-contact">
      <Button size='md'
  height='48px'
  width='200px'
  border='2px'
  borderColor='green.500'>Add Contact</Button></Link>
    </WrapItem>

<WrapItem>
{isLoggedIn && (
<>
<Link color="gray.500" onClick={() => auth.signOut()}>
<Button paddingY="6"colorScheme='red'  variant='outline'>
    Log Out
  </Button>{" "}
</Link>

<Text ml="20px" paddingY="2" paddingX="2" color="green.500"> {user.email}</Text>

</>
)}

{!isLoggedIn && (
<Button colorScheme='teal'  variant='outline' leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
Login with Google
</Button>
)}
 </WrapItem>
 <WrapItem mr="20px">
<Button paddingY="6" colorScheme='teal'  variant='outline' onClick={() => toggleColorMode()}>
{colorMode == "dark" ? <FaSun /> : <FaMoon />}
</Button> </WrapItem>

</Wrap>
    </Stack>
    
   
);
};
export default Auth;