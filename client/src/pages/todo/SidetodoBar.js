import { useContext, useEffect, useState } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { getTodos } from "../../apiHelper/todo";
import { isAuthenticate, signout } from "../../apiHelper/auth";
import { TodoContext } from "../../context/todo";
import NavItem from "../../components/navbar/NavItem";
import { toast, ToastContainer } from "react-toastify";

const SidetodoBar = ({ onClose, display }) => {
  const [todos, setTodos] = useState([]);
  const { refreshTodo } = useContext(TodoContext);
  const navigate = useNavigate();
  const textColoe = useColorModeValue("gray.500", "gray.400");
  useEffect(() => {
    getTodos(isAuthenticate()?.token).then((response) => {
      if (!response.error) {
        setTodos(response.todos);
      } else {
        toast.error(`Something went worng`, { theme: "dark", autoClose: 2000 });
        signout(() => {
          navigate("/signin");
        });
      }
    });
  }, [refreshTodo, navigate]);
  return (
    <>
      <ToastContainer />
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.300", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        zIndex={"overlay"}
        h="full"
        display={display}
        overflow={"scroll"}
      >
        <Flex
          alignItems="center"
          px="8"
          py="14px"
          justifyContent="space-between"
          position={"sticky"}
          top={0}
          left={0}
          bg={useColorModeValue("gray.100", "gray.900")}
          borderBottom="1px"
          borderBottomColor={useColorModeValue("gray.300", "gray.700")}
        >
          <Text
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            as={NavLink}
            to={"/"}
          >
            Logo
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        {todos?.map((values, index) => (
          <NavItem key={index} id={values._id} onClose={onClose}>
            <Text flexGrow={1}>
              {values.todo.length > 5 ? values.todo : values.todo}
            </Text>
            <Text fontSize={["xs"]} color={textColoe}>
              {values.tasks?.length}
            </Text>
          </NavItem>
        ))}
      </Box>
    </>
  );
};

export default SidetodoBar;
