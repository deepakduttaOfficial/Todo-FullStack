import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Wrapper from "../todo/Wrapper";

import { getTodo } from "../../apiHelper/todo";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../context/todo";
import { isAuthenticate } from "../../apiHelper/auth";
import { toast } from "react-toastify";
import EditTodo from "../todo/EditTodo";

const Alltask = () => {
  const { todoId } = useParams();
  const { refreshTodo } = useContext(TodoContext);
  const { token, data } = isAuthenticate();

  const [value, setValues] = useState({});

  useEffect(() => {
    getTodo(token, data._id, todoId).then((response) => {
      if (!response.error) {
        setValues(response.todo);
      } else {
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      }
    });
  }, [refreshTodo, todoId, token, data._id]);

  const { todo } = value;

  return (
    <Wrapper>
      <Box
        borderBottom="1px"
        borderBottomColor={useColorModeValue("gray.300", "gray.700")}
        bg={useColorModeValue("gray.100", "gray.900")}
        position="sticky"
        top={0}
        zIndex={"2"}
      >
        <HStack p={5}>
          <EditTodo todoName={todo} />
        </HStack>
      </Box>
      <Box py={3} px={5}></Box>
    </Wrapper>
  );
};

export default Alltask;
