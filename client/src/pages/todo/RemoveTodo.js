import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticate } from "../../apiHelper/auth";
import { removeTodo } from "../../apiHelper/todo";
import { TodoContext } from "../../context/todo";
import { toast, ToastContainer } from "react-toastify";

const RemoveTodo = () => {
  const { refreshTodo, setRefreshTodo } = useContext(TodoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { todoId } = useParams();
  const { token, data } = isAuthenticate();
  const navigate = useNavigate();
  const isRemove = () => {
    removeTodo(token, data._id, todoId).then((response) => {
      if (!response.error) {
        toast.success(`${response.message}`, {
          theme: "dark",
          autoClose: 2000,
        });
        setRefreshTodo(!refreshTodo);
        navigate("/");
      } else {
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
        setRefreshTodo(!refreshTodo);
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <IconButton size={["xs", "sm"]} onClick={onOpen} title={`Remove todo`}>
        <AiOutlineDelete />
      </IconButton>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure? All your task will be deleted.</ModalBody>
          <ModalFooter>
            <Button onClick={isRemove} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveTodo;
