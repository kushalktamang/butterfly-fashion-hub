import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ExchangePolicy from "./pages/ExchnagePolicy";
import { Contact } from "lucide-react";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PlaceOrder from "./pages/PlaceOrder";
import { useParams } from "react-router-dom";
import Products from "./pages/Products";

export function ProductsRoute() {
  const { productId } = useParams();
  return <Products key={productId} />;
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/exchange-policy" element={<ExchangePolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/products/:productId" element={<ProductsRoute />} />
      </Routes>
    </div>
  );
}
