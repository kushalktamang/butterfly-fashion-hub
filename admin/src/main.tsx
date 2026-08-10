import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Add from "./pages/Add.tsx";
import List from "./pages/List.tsx";
import Orders from "./pages/Orders.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("root element not found.");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/add" replace /> },
      { path: "/add", element: <Add /> },
      { path: "/list", element: <List /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
