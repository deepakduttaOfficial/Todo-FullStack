import {
  Box,
  CardBody,
  HStack,
  IconButton,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { toast } from "react-toastify";
import { isAuthenticate } from "../../apiHelper/auth";
import { removeTask } from "../../apiHelper/task";
import { TaskContext } from "../../context/task";
import EditTask from "../../pages/taskManager/EditTask";

const Taskcard = ({ task, date, time, taskId, index }) => {
  const textColoe = useColorModeValue("gray.500", "gray.400");
  const { token, data } = isAuthenticate();
  const { refreshTask, setRefreshTask } = useContext(TaskContext);
  const [taskLoading, setTaskLoading] = useState(false);

  const isRemove = () => {
    setTaskLoading(true);
    removeTask(token, data._id, taskId).then((response) => {
      if (!response.error) {
        toast.success(`${response.message}`, {
          theme: "dark",
          autoClose: 2000,
        });
        setTaskLoading(false);
        setRefreshTask(!refreshTask);
      } else {
        setTaskLoading(false);
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
        setRefreshTask(!refreshTask);
      }
    });
  };
  return (
    <Box
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.300", "gray.900")}
    >
      <CardBody>
        <HStack>
          <HStack flexGrow={1}>
            <Tag>{index}.</Tag>
            <Text fontSize={["14px", "18px"]} fontWeight="semibold">
              {task}
            </Text>
          </HStack>

          <HStack>
            <EditTask taskId={taskId} />
            <IconButton
              size={["xs", "sm"]}
              onClick={isRemove}
              isLoading={taskLoading}
            >
              <AiOutlineDelete />
            </IconButton>
          </HStack>
        </HStack>

        <HStack m={0} ml={8} mt={1}>
          <HStack>
            <BsCalendarDate size={"13px"} />
            <Text fontSize={["xs"]} color={textColoe}>
              {date}
            </Text>
          </HStack>
          <HStack ml={1}>
            <BiTime size={"13px"} />
            <Text fontSize={["xs"]} color={textColoe}>
              {time}
            </Text>
          </HStack>
        </HStack>
      </CardBody>
    </Box>
  );
};

export default Taskcard;
