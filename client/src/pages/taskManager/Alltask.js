import {
  Box,
  Card,
  Center,
  Divider,
  HStack,
  Image,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Wrapper from "../todo/Wrapper";

import { getTodo } from "../../apiHelper/todo";
import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../../context/todo";
import { isAuthenticate } from "../../apiHelper/auth";
import { toast } from "react-toastify";
import EditTodo from "../todo/EditTodo";
import Taskcard from "../../components/card/Taskcard";
import { getTasks } from "../../apiHelper/task";
import { formateDate, formateTime } from "../../components/js/date";
import { TaskContext } from "../../context/task";
import RemoveTodo from "../todo/RemoveTodo";
import CreateTask from "./CreateTask";
import noTodo from "../../images/ontodo.svg";

const Alltask = () => {
  const { todoId } = useParams();
  const { refreshTodo } = useContext(TodoContext);
  const { token, data } = isAuthenticate();
  const [value, setValues] = useState({});
  const [taskLoading, setTaskLoading] = useState(false);
  // Get single todo name
  useEffect(() => {
    getTodo(token, data._id, todoId).then((response) => {
      if (!response.error) {
        setValues(response.todo);
      } else {
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      }
    });
  }, [refreshTodo, todoId, token, data._id]);
  const { todo } = value;
  // Get all task todo wise
  const [tasks, setTasks] = useState([]);
  const { refreshTask } = useContext(TaskContext);
  useEffect(() => {
    setTaskLoading(true);
    getTasks(token, data._id, todoId).then((response) => {
      if (!response.error) {
        setTaskLoading(false);
        setTasks(response.tasks);
      } else {
        setTaskLoading(false);
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      }
    });
  }, [refreshTodo, todoId, token, data._id, refreshTask]);

  return (
    <Wrapper>
      <Box
        borderBottom="1px"
        borderBottomColor={useColorModeValue("gray.300", "gray.700")}
        bg={useColorModeValue("gray.100", "gray.900")}
        position="sticky"
        top={0}
        zIndex={"2"}
      >
        <HStack p={4}>
          <EditTodo todoName={todo} />
          <RemoveTodo />
          <Center height="30px" ml={3}>
            <Divider orientation="vertical" />
          </Center>
          <CreateTask />
        </HStack>
        {taskLoading && (
          <Progress size="xs" isIndeterminate hasStripe value={80} />
        )}
      </Box>
      <Box py={3} px={5}>
        <Card>
          {tasks?.map((values, index) => {
            const { task, _id, createdAt } = values;
            return (
              <Taskcard
                key={index}
                task={task}
                date={formateDate(createdAt)}
                time={formateTime(createdAt)}
                taskId={_id}
                index={index + 1}
              />
            );
          })}
        </Card>
        {!taskLoading && tasks?.length === 0 && (
          <Image src={noTodo} alt="No Task found" mt={10} />
        )}
      </Box>
    </Wrapper>
  );
};

export default Alltask;
