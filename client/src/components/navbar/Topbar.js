// Import from chakra ui components
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Text,
  IconButton,
} from "@chakra-ui/react";

// React Icons
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { isAuthenticate } from "../../apiHelper/auth";
import Todo from "../../pages/todo/Todo";
import Profile from "../profile";

const Topbar = ({ onOpen }) => {
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.300", "gray.700")}
      position={!onOpen && "sticky"}
      top={0}
      zIndex={"overlay"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {onOpen && (
          <Box display={{ base: "block", md: "none" }}>
            <IconButton
              variant="outline"
              onClick={onOpen}
              aria-label="open menu"
              icon={<FiMenu />}
            />
          </Box>
        )}

        <Text
          as={NavLink}
          to={"/"}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          ml={4}
        >
          Todo
        </Text>

        <Flex alignItems={"center"}>
          {isAuthenticate() ? (
            <>
              <Todo />
              <Profile />
            </>
          ) : (
            <>
              <Button as={NavLink} to={"/signup"} variant="solid" mr={2}>
                Sign up
              </Button>
              <Button
                colorScheme="blue"
                as={NavLink}
                to={"/signin"}
                variant="solid"
              >
                Sign in
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Topbar;
