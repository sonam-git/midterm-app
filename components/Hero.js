import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function SplitScreen() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} textAlign={"center"}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              Data Driven FullStack App
            </Text>
            <br />{' '}
            <Text color={'blue.500'} as={'span'} >
              Midterm Project
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'white.500'} textAlign={"center"}>
            The place where you can Create, Retrieve, Update & Delete your To Do List, 
            Event List, and Contact List saved in the Firebase Database. 
          </Text><Button size='lg' colorScheme='green' mb={5} rounded={'full'} _hover={{
            textDecoration: 'none',
            bg:"white",
            color: "green"
          }}width="100%">
          <Link href={'all-list'}
          >
            Your Data Base File</Link></Button>
         
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image mt={4}
          borderRadius={'15'}
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}