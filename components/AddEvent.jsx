import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
InputGroup,
    InputLeftElement
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import useAuth from "../hooks/useAuth";
import { addEvent } from "../api/event";
const AddEvent = () => {
const [eventname, setEventname] = React.useState("");
const [eventdate, setEventdate] = React.useState("");
const [status, setStatus] = React.useState("pending");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth() || {};

const handleEventCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to create an event",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);

const event = {
eventname,
eventdate,
status,
userId: user.uid,
};

await addEvent(event);
setIsLoading(false);
setEventname("");
setEventdate("");
setStatus("pending");
toast({ title: "Event created successfully", status: "success" });
};

return (
<Box w="50%" margin={"0 auto"} display="block" mt={5} minH={'100vh'}>
<Stack direction="column">
<Input
placeholder="Event Name"
value={eventname}
onChange={(e) => setEventname(e.target.value)}
/>
<InputGroup>
    <InputLeftElement
      pointerEvents='none'>
      <CalendarIcon color='gray.300' /></InputLeftElement>
<Input type="date"
placeholder="Event Date"
value={eventdate}
onChange={(e) => setEventdate(e.target.value)}
/></InputGroup>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
<option
value={"pending"}
style={{ color: "yellow", fontWeight: "bold" }}
>
Pending ⌛
</option>
<option
value={"completed"}
style={{ color: "green", fontWeight: "bold" }}
>
Completed ✅
</option>
</Select>
<Button
onClick={() => handleEventCreate()}
disabled={eventname.length < 1 || eventdate.length < 1 || isLoading}
colorScheme="green"
variant="solid"
>
Add Event
</Button>
</Stack>
</Box>
);
};
export default AddEvent;