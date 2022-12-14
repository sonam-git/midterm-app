import React from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Avatar
} from '@chakra-ui/react';
import { 
  HamburgerIcon, 
  CloseIcon,
  
} from '@chakra-ui/icons';
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";



const Links = [
  {
    label:'Home',
    url:'/'
  },
  {
    label:'Add To Do',
    url:'/add-todo'
  },
  {
    label:'Add Event',
    url:'/add-event'
  },
  {
    label:'Add Contact',
    url: '/add-contact'
  },
  {
    label:'Contact List',
    url: '/contact-list'
  },
  {
    label:'To Do List',
    url: '/todo-list'
  },
  {
    label:'Event List',
    url: '/event-list'
  }
];

const Header = () => {
  const { isLoggedIn, user } = useAuth() || {};
  const { toggleColorMode, colorMode } = useColorMode();
  
  const logOut = () => {
    auth.signOut();
    location.assign('/');
  };
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
    const { isOpen, onOpen, onClose } = useDisclosure()|| {};

  return (
    <>
      <Box  color="white" bg={useColorModeValue('teal.500', 'gray.900')} px={4} >
        <Flex   h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
         
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            color={"white"}
            bg={"teal.500"}
            colorScheme='white'  variant='outline'
            
            
          />
          <HStack spacing={8} alignItems={'center'}  >
            <Box>
              <Link href={'https://portal.santarosa.edu/SRWeb/SR_CourseOutlines.aspx?ck=CS55.13'} isExternal>
              <Avatar
                  size={'md'}
                  src={
                    " "
                  } 
                />
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Link
                  key={link.url}
                  px={2}
                  py={1}
                  rounded={'md'}
                  href={link.url}
                  fontWeight={"bold"} 
                  _hover={{
                    textDecoration: 'none',
                    bg: "white",
                    color: "black",
                    fontWeight: "bold"
                  }}>
                  {link.label}
                </Link>
                
              ))}
            </HStack>
            
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
          
              <Box pr={"2"}>
            {isLoggedIn && (
                    <>
                        <HStack spacing='5px'> {/*<Text color="white"> {user.email}</Text>*/}
                        <Link color="red.500" onClick={() => logOut()}  >
                            <Button paddingY="3"colorScheme='red'  variant='outline' bg="white" _hover={{
                    textDecoration: 'none',
                    bg: "red",
                    color: "white"
                  }}>
                            Logout
                            </Button>
                        </Link>
                        </HStack>
                       

                    </>
                )}
                {!isLoggedIn && (
                    <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()} colorScheme='white'  variant='outline'
                    _hover={{
                      textDecoration: 'none',
                      bg:"white",
                      color: "black"
                    }}>
                        Login
                    </Button>
                )}
            </Box>
                  
              <Box>
            <Button paddingY="3" colorScheme='white'  variant='outline' onClick={() => toggleColorMode()}>
{colorMode == "dark" ? <FaSun /> : <FaMoon />}
</Button></Box>
            </Menu>
          </Flex>
        </Flex>
       
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }} >
            <Stack as={'nav'} spacing={4}  >
              {Links.map((link) => (
                <Link key={link.url}
                href={link.url}
                fontWeight={"bold"} 
                _hover={{
                  textDecoration: 'none',
                  color: "yellow",
                  fontWeight: "bold"
                }}> {link.label}</Link>
              ))}
            </Stack>
          </Box>
        ) : null}
        
      </Box>
      
    </>
    
)
}

export default Header;
