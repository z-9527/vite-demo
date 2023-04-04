
import React from "react";
import { RouteObject } from "react-router-dom";

const Home = React.lazy(() => import(".//home")); 
const Expenses = React.lazy(() => import(".//home/expenses")); 
const Invoices = React.lazy(() => import(".//home/invoices")); 
const Login = React.lazy(() => import(".//login")); 
const Test = React.lazy(() => import(".//test/page1")); 

const routes: RouteObject[] = [
  {
    "path": "/home",
    "element": <Home />,
    "children": [
      {
        "path": "/home/expenses",
        "element": <Expenses />,
        "children": []
      },
      {
        "path": "/home/invoices",
        "element": <Invoices />,
        "children": []
      }
    ]
  },
  {
    "path": "/login",
    "element": <Login />,
    "children": []
  },
  {
    "path": "/test/page1",
    "element": <Test />,
    "children": []
  }
];
export default routes;      
      