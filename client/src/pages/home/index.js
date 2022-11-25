import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Todocard from "../../components/card/Todocard";
import Navbar from "../../components/navbar/Topbar";
// Api helper
import { isAuthenticate, signout } from "../../apiHelper/auth";
import { getTodos } from "../../apiHelper/todo";
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
  Image,
  Skeleton,
} from "@chakra-ui/react";

// Create another date formate function
import { formateDate } from "../../components/js/date";
import { TodoContext } from "../../context/todo";
// Image
import noTodo from "../../images/ontodo.svg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const { refreshTodo } = useContext(TodoContext);
  const [todoLoading, setTodoLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setTodoLoading(true);
    isAuthenticate() &&
      getTodos(isAuthenticate()?.token).then((response) => {
        if (!response.error) {
          setTodos(response.todos);
          setTodoLoading(false);
        } else {
          toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
          setTodoLoading(false);
          signout(() => {
            navigate("/signin");
          });
        }
      });
  }, [refreshTodo, navigate]);
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
          {todoLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
              return <Skeleton height="70px" key={index} mt={1} />;
            })}
          <CardBody p={0}>
            <Stack divider={<StackDivider />}>
              {todos?.map((values, index) => {
                const { todo, createdAt, tasks, _id } = values;
                return (
                  <Todocard
                    key={index}
                    todo={todo}
                    date={formateDate(createdAt)}
                    task={tasks?.length}
                    todoId={_id}
                  />
                );
              })}
            </Stack>
          </CardBody>
        </Card>
        {!todoLoading && todos?.length === 0 && (
          <Image src={noTodo} alt="No todo found" />
        )}
      </Container>
    </>
  );
};

export default Home;
