import {
  Button,
  IconButton,
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
import { BiEdit } from "react-icons/bi";
import { isAuthenticate } from "../../apiHelper/auth";
import { editTask } from "../../apiHelper/task";
import { toast, ToastContainer } from "react-toastify";
import { TaskContext } from "../../context/task";

const EditTask = ({ taskId }) => {
  const { refreshTask, setRefreshTask } = useContext(TaskContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState();
  const [loading, setLoading] = useState(false);
  const { token, data } = isAuthenticate();
  const handleChange = (e) => {
    setTask(e.target.value);
    setLoading(false);
  };

  const isEdit = () => {
    setTask(...task);
    setLoading(true);
    editTask(data._id, taskId, { task }, token).then((response) => {
      if (response.error) {
        setTask(...task);
        setLoading(false);
        setRefreshTask(!refreshTask);
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      } else {
        setRefreshTask(!refreshTask);
        setTask(task);
        setLoading(false);
        toast.success(`Task updated successfully`, {
          theme: "dark",
          autoClose: 2000,
        });
      }
    });
  };

  return (
    <>
      <ToastContainer />
      <IconButton size={["xs", "sm"]} onClick={onOpen}>
        <BiEdit />
      </IconButton>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={task} onChange={handleChange} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={isEdit} colorScheme="blue" isLoading={loading}>
              Save
            </Button>
            <Button onClick={onClose} ml={4}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTask;
