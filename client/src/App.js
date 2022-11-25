import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { TaskContext } from "./context/task";
import { TodoContext } from "./context/todo";
import Routes from "./Routes";
import { theme } from "./styles/theme";

const App = () => {
  const [refreshTodo, setRefreshTodo] = useState(false);
  const [refreshTask, setRefreshTask] = useState(false);
  return (
    <ChakraProvider theme={theme}>
      <TaskContext.Provider value={{ refreshTask, setRefreshTask }}>
        <TodoContext.Provider value={{ refreshTodo, setRefreshTodo }}>
          <Routes />
        </TodoContext.Provider>
      </TaskContext.Provider>
    </ChakraProvider>
  );
};

export default App;
