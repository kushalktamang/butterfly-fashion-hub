import { Document } from "mongoose";

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string | string[];
}

export interface OrderAddress {
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
  items: OrderItem[];
  amount: number;
  address: OrderAddress;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
  orderNumber: string;
}

export interface OrderDocument extends Order, Document {}