import { createContext } from "react";
import type { Product } from "../assets/assets";
import type { CartItems } from "./shop-context-provider";

export interface ShopContextType {
  currency: string;
  delivery_fee: number;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  isProductsLoading: boolean;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  addToCart: (itemId: string, size: string, quantity?: number) => Promise<void>;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => Promise<void>;
  getCartAmount: () => number;
  backendUrl: string;
}

export const ShopContext = createContext<ShopContextType | undefined>(undefined);
