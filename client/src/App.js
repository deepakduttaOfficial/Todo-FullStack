import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { TodoContext } from "./context/todo";
import Routes from "./Routes";
import { theme } from "./styles/theme";

const App = () => {
  const [refreshTodo, setRefreshTodo] = useState(false);
  return (
    <ChakraProvider theme={theme}>
      <TodoContext.Provider value={{ refreshTodo, setRefreshTodo }}>
        <Routes />
      </TodoContext.Provider>
    </ChakraProvider>
  );
};

export default App;
