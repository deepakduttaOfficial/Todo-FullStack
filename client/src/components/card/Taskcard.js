import {
  Box,
  CardBody,
  HStack,
  IconButton,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import EditTask from "../../pages/taskManager/EditTask";

const Taskcard = ({ task, date, time, isRemove, taskId, index }) => {
  const textColoe = useColorModeValue("gray.500", "gray.400");
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
            <IconButton size={["xs", "sm"]} onClick={isRemove}>
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
