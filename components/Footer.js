import {
    Box,
    chakra,
    Container,
    Link,
    Stack,
    Text,
    useColorModeValue,
    ButtonGroup,
    IconButton,
    Button
  } from '@chakra-ui/react';
  import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

  export default function Footer() {
    return (
      
      <Box
      bg={useColorModeValue('teal.500', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="20px">
       
      <Container
        as={Stack}
        maxW={'6xl'}
        py={2}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
          <Text fontSize="sm" color="white" alignItems="center"> &copy; {new Date().getFullYear()} CS55.13 SJSHERPA. ALL RIGHTS RESERVED.</Text>
          <Stack direction={'row'} spacing={6}>
          <ButtonGroup variant="outline" >
          <IconButton
            as="a"
            href="https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="1.25rem" />}
          />
          <IconButton as="a" href="https://github.com/sonam-git/midterm-app.git" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />}  />
          <IconButton
            as="a"
            href="https://twitter.com/i/flow/login"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="1.25rem" />}
          />
  
        </ButtonGroup>
          </Stack>
        </Container>
        </Box>
      
      
    );
  }