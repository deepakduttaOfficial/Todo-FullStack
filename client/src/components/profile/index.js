import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
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
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
          </Center>
          <br />
          <Center>
            <p>Deepak</p>
          </Center>
          <br />
          <MenuItem onClick={toggleColorMode}>
            {colorMode === "light" ? <BsMoonFill /> : <BsFillSunFill />}
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
  );
};

export default Profile;
