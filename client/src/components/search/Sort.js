import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";

const Sort = ({ getValue, sort }) => {
  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} colorScheme="blue" rightIcon={<BiSortAlt2 />}>
        {sort === "1" ? "Oldest" : "Latest"}
      </MenuButton>
      <MenuList minWidth="240px" zIndex={"overlay"}>
        <MenuOptionGroup type="radio" defaultValue={sort}>
          <MenuItemOption
            value="1"
            onClick={() => {
              getValue("1");
            }}
          >
            Oldest
          </MenuItemOption>
          <MenuItemOption
            value="-1"
            onClick={() => {
              getValue("-1");
            }}
          >
            Latest
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default Sort;
