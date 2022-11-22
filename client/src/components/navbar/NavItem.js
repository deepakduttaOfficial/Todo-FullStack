import { Link, Flex, useColorModeValue, Icon } from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";

const NavItem = ({ icon, children, id, onClose }) => {
  const { todoId } = useParams();
  const todoItemColor = useColorModeValue("gray.300", "gray.800");
  return (
    <Link
      as={NavLink}
      to={`/user/todo/tasks/${id}`}
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        py="4"
        px="6"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontWeight={"semibold"}
        bg={todoId === id && todoItemColor}
        _hover={{
          bg: todoItemColor,
        }}
        onClick={onClose}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={FcTodoList}
        />
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
