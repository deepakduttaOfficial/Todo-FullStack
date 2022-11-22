import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Alltask from "./pages/taskManager/Alltask";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/todo/tasks/:todoId" element={<Alltask />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
