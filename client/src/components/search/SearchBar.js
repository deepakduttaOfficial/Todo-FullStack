import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ clickToSearch, searchChange, search }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size={"md"} title={"search"}>
        <BiSearch />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
        <ModalOverlay />
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              clickToSearch(onClose);
            }}
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiSearch color="gray.300" />}
              />
              <Input
                type="tel"
                placeholder="Phone number"
                border={"none"}
                ring={0}
                onChange={searchChange}
                value={search}
              />
            </InputGroup>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchBar;
