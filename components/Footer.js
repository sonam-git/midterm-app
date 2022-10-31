import {
    Box,
    chakra,
    Container,
    Link,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  

  export default function Footer() {
    return (
      
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            justify={{ base: 'center'}}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2022 SRJC CS55.13 SJSHERPA. All rights reserved</Text>
          </Container>
      
    );
  }