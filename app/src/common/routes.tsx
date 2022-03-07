import React from "react";
import { AsyncRouteProps } from "@jaredpalmer/after";
import Home from "../pages/home";
import About from "../pages/about";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
] as AsyncRouteProps[];
