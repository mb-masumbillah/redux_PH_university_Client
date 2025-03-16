import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { adminPaths } from "./Admin.route";
import { routeGenerator } from "../utils/routeGenerator";
import { facultyPaths } from "./Faculty.route";
import { studentPaths } from "./Studnet.route";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin',
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: '/faculty',
    element: <App />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: '/student',
    element: <App />,
    children: routeGenerator(studentPaths),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;