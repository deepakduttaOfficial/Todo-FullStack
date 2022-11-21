// Import from chakra ui components
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";

// React Icons
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { isAuthenticate } from "../../pages/apiHelper/auth";
import Todo from "../../pages/todo";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      bg={useColorModeValue("gray.300", "gray.800")}
      px={4}
      position={"sticky"}
      top={0}
      zIndex={"overlay"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box as={NavLink} to="/">
          Logo
        </Box>

        <Flex alignItems={"center"}>
          {isAuthenticate() ? (
            <>
              <Todo />
              <Stack direction={"row"} spacing={7}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Deepak</p>
                    </Center>
                    <br />
                    <MenuItem onClick={toggleColorMode}>
                      {colorMode === "light" ? (
                        <BsMoonFill />
                      ) : (
                        <BsFillSunFill />
                      )}
                      <Text ml={4}>
                        {colorMode === "light" ? "Dark Mood" : "light Mood"}
                      </Text>
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </>
          ) : (
            <>
              <Button
                // colorScheme="blue"
                as={NavLink}
                to={"/signup"}
                variant="solid"
                mr={2}
              >
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

export default Navbar;
