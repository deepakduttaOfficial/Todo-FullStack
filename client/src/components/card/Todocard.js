import {
  Heading,
  Box,
  Text,
  LinkBox,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { FcTodoList } from "react-icons/fc";

const Todocard = ({ todo, date, task = 0, todoId }) => {
  const textColoe = useColorModeValue("gray.500", "gray.400");
  return (
    <LinkBox
      _hover={{ bgColor: useColorModeValue("gray.300", "gray.800") }}
      px={5}
      py={2}
      title={todo}
    >
      <Box as={NavLink} to={`/user/todo/tasks/${todoId}`}>
        <HStack align={"center"}>
          <Heading size="md" mr={1}>
            {todo}
          </Heading>
          <FcTodoList /> <Text color={textColoe}>{task}</Text>
        </HStack>
        <Text pt="2" fontSize="sm" color={textColoe}>
          {date}
        </Text>
      </Box>
    </LinkBox>
  );
};

export default Todocard;
