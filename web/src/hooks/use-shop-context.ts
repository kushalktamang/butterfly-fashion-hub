import { use } from "react";
import { ShopContext } from "../context/shop-context";

export const useShopContext = () => {
  const context = use(ShopContext);

  if (!context) {
    throw new Error("useShopContext must be used within ShoppingContext provider");
  }

  return context;
};
