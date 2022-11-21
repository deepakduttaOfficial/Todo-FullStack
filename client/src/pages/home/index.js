import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Todocard from "../../components/card/Todocard";
import Navbar from "../../components/navbar";
// Api helper
import { isAuthenticate } from "../apiHelper/auth";
import { getTodos } from "../apiHelper/todo";
// Chakra ui
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Container,
  Divider,
} from "@chakra-ui/react";

// Create another date formate function
import { formateDate } from "../../components/js/date";
import { TodoContext } from "../../context/todo";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const { refreshTodo } = useContext(TodoContext);
  useEffect(() => {
    getTodos(isAuthenticate()?.token).then((response) => {
      if (!response.error) {
        setTodos(response.todos);
      } else {
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      }
    });
  }, [refreshTodo]);
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Container maxW="2xl" my={5}>
        <Card variant={"filled"} boxShadow={"2xl"}>
          <CardHeader>
            <Heading size="md">All Todos</Heading>
          </CardHeader>
          <Divider />
          <CardBody p={0}>
            <Stack divider={<StackDivider />}>
              {todos?.map((values, index) => {
                const { todo, createdAt, tasks } = values;
                return (
                  <Todocard
                    key={index}
                    todo={todo}
                    date={formateDate(createdAt)}
                    task={tasks?.length}
                  />
                );
              })}
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Home;
