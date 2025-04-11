import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";

export const routes = [
  {
    path: "/",
    element: Dashboard,
  },
  {
    path: "/login",
    element: Login,
  },
];
export const renderRoute = (routes) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
};
