import { useEffect, useState, type ReactNode } from "react";
import { ShopContext, type ShopContextType } from "./shop-context";
import type { Product } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const viteBackendURL = import.meta.env.VITE_BACKEND_URL as string;
if (!viteBackendURL) {
  throw new Error("VITE_BACKEND_URL is missing.");
}

export interface ProductData {
  _id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  description: string;
  image: string[];
  sizes?: string[];
  bestseller?: boolean;
  bestSeller?: boolean;
  date: number | string | Date;
  quantity: number;
}

interface ProductListResponse {
  success: boolean;
  products: ProductData[];
  message?: string;
}

export type CartItems = Record<string, Record<string, number>>;

interface ShopContextProps {
  children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProps) => {
  const currency = "रू";
  const delivery_fee = 150;
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [products, setProducts] = useState<Product[]>([]);
  const backendUrl = viteBackendURL;

  // product adding to cart
  const addToCart = (itemId: string, size: string, quantity = 1): Promise<void> => {
    const cartData: CartItems = structuredClone(cartItems);
    cartData[itemId] ??= {};
    cartData[itemId][size] = (cartData[itemId][size] ?? 0) + quantity;
    setCartItems(cartData);
    toast.success("Added to cart");
    return Promise.resolve();
  };

  // getting cart counts
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      const sizeQuantities = cartItems[items];
      if (!sizeQuantities) continue;
      for (const item in sizeQuantities) {
        const qty = sizeQuantities[item];
        if (qty !== undefined && qty > 0) {
          totalCount += qty;
        }
      }
    }
    return totalCount;
  };

  // updating quantity
  const updateQuantity = (itemId: string, size: string, quantity?: number): Promise<void> => {
    const cartData = structuredClone(cartItems);
    const sizeQuantities = cartData[itemId];
    if (!sizeQuantities) return Promise.resolve();
    sizeQuantities[size] = quantity ?? 0;
    cartData[itemId] = sizeQuantities;
    setCartItems(cartData);
    return Promise.resolve();
  };

  // getting cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;

    for (const productId in cartItems) {
      const itemInfo = products.find((product) => product._id === productId);

      if (!itemInfo) continue; // Skip if product not found

      const sizeQuantities = cartItems[productId];
      if (!sizeQuantities) continue;

      for (const size in sizeQuantities) {
        const quantity = sizeQuantities[size];
        if (quantity !== undefined && quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  // getting url from backend
  useEffect(() => {
    const validSizes: Product["sizes"] = ["S", "M", "L", "XL", "XXL", "XXXL"];
    const normalizeProduct = (item: ProductData): Product => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: Array.isArray(item.image) ? item.image : [],
      category: item.category,
      subCategory: item.subCategory,
      sizes: Array.isArray(item.sizes)
        ? item.sizes.filter((size): size is Product["sizes"][number] =>
            validSizes.includes(size as Product["sizes"][number]),
          )
        : [],
      date: typeof item.date === "number" ? item.date : new Date(item.date).getTime() || Date.now(),
      bestseller: item.bestseller ?? item.bestSeller ?? false,
      quantity: item.quantity,
    });

    const getProductData = async () => {
      try {
        const response = await axios.get<ProductListResponse>(`${backendUrl}/products/list`);
        if (response.data.success) {
          const normalizedProducts = response.data.products.map(normalizeProduct);
          setProducts(normalizedProducts);
        } else {
          toast.error(response.data.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          console.log(error);
        }
      } finally {
        setIsProductsLoading(false);
      }
    };
    void getProductData();
  }, [backendUrl]);

  const value: ShopContextType = {
    currency,
    delivery_fee,
    products,
    setProducts,
    isProductsLoading,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartAmount,
    updateQuantity,
    getCartCount,
    backendUrl,
  };

  return <ShopContext value={value}>{children}</ShopContext>;
};

export default ShopContextProvider;
