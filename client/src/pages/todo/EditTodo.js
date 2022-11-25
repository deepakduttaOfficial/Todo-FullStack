// import  FocusLock from "react-focus-lock"
import React, { useContext, useEffect, useState } from "react";
import {
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

import { BiEdit } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateTodo } from "../../apiHelper/todo";
import { isAuthenticate } from "../../apiHelper/auth";
import { TodoContext } from "../../context/todo";

const EditTodo = ({ todoName }) => {
  const { refreshTodo, setRefreshTodo } = useContext(TodoContext);
  const [todo, setTodo] = useState("");
  const [loding, setLoding] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const { todoId } = useParams();
  const { token, data } = isAuthenticate();

  const editButton = useColorModeValue("gray.300", "");

  useEffect(() => {
    setIsEditing(false);
  }, [todoId]);

  const handleChange = (e) => {
    setTodo(e.target.value);
    setLoding(false);
  };

  // Edit todo
  const handleClick = () => {
    setTodo(...todo);
    setLoding(true);
    updateTodo(data._id, todoId, { todo }, token).then((response) => {
      if (response.error) {
        setTodo(...todo);
        setLoding(false);
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      } else {
        setRefreshTodo(!refreshTodo);
        setIsEditing(false);
        setTodo(todo);
        setLoding(false);
        toast.success(`Todo updated successfully`, {
          theme: "dark",
          autoClose: 2000,
        });
      }
    });
  };

  return (
    <>
      <ToastContainer />
      {!isEditing && <Heading size={["xs", "sm", "md"]}>{todoName}</Heading>}
      <HStack>
        {isEditing ? (
          <>
            <Input value={todo} onChange={handleChange} />
            <ButtonGroup justifyContent="center" size="sm">
              <IconButton
                bgColor={editButton}
                icon={<BsCheck />}
                onClick={handleClick}
                title={"Update todo name"}
                disabled={
                  ((todoName === todo && todo?.trim()) || todo.length === 0) &&
                  true
                }
                isLoading={loding}
              />
              <IconButton
                bgColor={editButton}
                icon={<AiOutlineClose />}
                title={"close"}
                onClick={() => {
                  setIsEditing(false);
                }}
              />
            </ButtonGroup>
          </>
        ) : (
          <Flex justifyContent="center">
            <IconButton
              size="sm"
              icon={<BiEdit />}
              title="Edit"
              onClick={() => {
                setTodo(todoName);
                setIsEditing(true);
              }}
            />
          </Flex>
        )}
      </HStack>
    </>
  );
};

export default EditTodo;
