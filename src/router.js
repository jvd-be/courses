import Home from "./Component/Home/Home";
import Courses from "./Component/Courses/Courses";
import Login from "./Component/Login/Login";
import DeatilsCourse from "./Component/DeatilsCourse/DeatilsCourse";
import DetailsBlog from "./Component/DetailsBlog/DetailsBlog";
import Blogs from "./Component/Blogs/Blogs";
import Cart from "./Component/Cart/Cart";
import React from "react";
const routes = [
  { path: "/", element: <Home /> },
  { path: "/courses", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/cart", element: <Cart /> },
  { path: "/course/:id", element: <DeatilsCourse /> },
  { path: "/blogs/:id", element: <DetailsBlog /> },
];

export default routes;
