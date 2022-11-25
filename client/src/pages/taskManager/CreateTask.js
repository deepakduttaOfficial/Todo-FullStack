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
import React, { useContext, useState } from "react";
import { GrAdd } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { isAuthenticate } from "../../apiHelper/auth";
import { createTask } from "../../apiHelper/task";
import { TaskContext } from "../../context/task";

const CreateTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, data } = isAuthenticate();
  const { todoId } = useParams();
  const { refreshTask, setRefreshTask } = useContext(TaskContext);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setTask(e.target.value);
    setLoading(false);
  };

  const handleClick = () => {
    setTask(...task);
    setLoading(true);

    createTask(token, data._id, todoId, { task }).then((response) => {
      if (response.error) {
        setTask(...task);
        setLoading(false);
        setRefreshTask(!refreshTask);
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      } else {
        setTask("");
        setLoading(false);
        setRefreshTask(!refreshTask);
        toast.success(`Task created successfully`, {
          theme: "dark",
          autoClose: 2000,
        });
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <Button
        variant={"solid"}
        colorScheme="blue"
        size={"sm"}
        mr={4}
        leftIcon={<GrAdd />}
        onClick={onOpen}
      >
        Create Task
      </Button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Tak name</FormLabel>
              <Input
                placeholder="Task name"
                value={task}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              //   disabled={todo.length === 0}
              onClick={handleClick}
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

export default CreateTask;
