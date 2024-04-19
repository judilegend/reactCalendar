import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Auth from "./components/Authentification";
import Dashboard from "./components/Dashboard";
import reportWebVitals from "./reportWebVitals";
import ContextWrapper from "./context/ContextWrapper";
import { NextUIProvider } from "@nextui-org/react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  ,
  {
    path: "/inscrire",
    element: <Auth />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "dashboard/:id",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextWrapper>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </ContextWrapper>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
