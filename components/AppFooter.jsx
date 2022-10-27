import React from "react";
import { withRouter } from "next/router";
import { Text, VStack,Stack,Wrap,WrapItem } from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

function AppFooter(props) {
    return(
        <React.Fragment>
            <VStack w="100%" h="100px" bg="gray.400" marginTop="350px">
            <Stack direction='column' mt="20px" ml="10" >
            <Wrap spacing={1}>
    <WrapItem >
                <text > © 2022 SRJC CS55.13 Server-Side Web Development.All rights reserved.</text>
                </WrapItem>
                <WrapItem float="right">
                <Link  href='https://github.com/sonam-git/midterm-app.git' isExternal>
                <text >GitHub Source Code </text><ExternalLinkIcon mx='2px' />
</Link>
</WrapItem>
</Wrap>
</Stack>
            </VStack>
        </React.Fragment>
    )
}
export default withRouter(AppFooter)