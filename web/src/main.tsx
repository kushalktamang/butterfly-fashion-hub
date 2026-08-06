import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app.tsx";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ExchangePolicy from "./pages/ExchnagePolicy";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PlaceOrder from "./pages/PlaceOrder";
import { useParams } from "react-router-dom";
import Products from "./pages/Products";
import Contact from "./pages/Contact.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("root element not found.");
}

export default function ProductsRoute() {
  const { productId } = useParams();
  return <Products key={productId} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/collection", element: <Collection /> },
      { path: "/exchange-policy", element: <ExchangePolicy /> },
      { path: "/contact-us", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order", element: <Order /> },
      { path: "/place-order", element: <PlaceOrder /> },
      { path: "/products/:productId", element: <ProductsRoute /> },
    ],
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
