export interface FormState {
  name: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  subCategory: string;
  bestSeller: boolean;
  sizes: string[];
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string[];
}

export interface OrderItem {
  _id: number;
  name: string;
  quantity: number;
  size?: string | string[];
}

export interface Address {
  name?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  phone?: string;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  address: Address;
  paymentMethod: string;
  amount: number;
  date: string | number;
  orderNumber: string;
}

export interface ProductResponse {
  success: boolean;
  message?: string;
}

export interface ProductErrorPayload {
  message?: string;
  error?: string;
}

export interface ListProductResponse {
  success: boolean;
  message?: string;
  products: Product[];
}

export interface OrderProductResponse {
  success: boolean;
  message?: string;
  orders: Order[];
}
