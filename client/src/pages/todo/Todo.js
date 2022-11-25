import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TodoContext } from "../../context/todo";
import { isAuthenticate } from "../../apiHelper/auth";
import { createTodo } from "../../apiHelper/todo";

const Todo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { refreshTodo, setRefreshTodo } = useContext(TodoContext);
  const [values, setValues] = useState({
    todo: "",
    loading: false,
    error: false,
    success: false,
  });
  const { todo, loading } = values;
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      loading: false,
      error: false,
      success: false,
    });
  };

  const { token, data } = isAuthenticate();

  const handleClick = () => {
    setValues({ ...values, error: false, success: false, loading: true });

    createTodo(data._id, { todo }, token).then((response) => {
      if (response.error) {
        setValues({ ...values, error: true, success: false, loading: false });
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      } else {
        setRefreshTodo(!refreshTodo);
        setValues({
          todo: "",
          error: false,
          success: true,
          loading: false,
        });
        toast.success(`Todo created successfully`, {
          theme: "dark",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate(`/user/todo/tasks/${response?.newTodo?._id}`);
        }, 2000);
      }
    });
  };
  return (
    <>
      <Button
        variant={"solid"}
        colorScheme="blue"
        size={"sm"}
        mr={4}
        leftIcon={<GrAdd />}
        onClick={onOpen}
      >
        New Todo
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Todo name</FormLabel>
              <Input
                placeholder="Todo name"
                value={todo}
                onChange={handleChange("todo")}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              disabled={todo.length === 0 || loading}
              onClick={handleClick}
              isLoading={loading}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Todo;
