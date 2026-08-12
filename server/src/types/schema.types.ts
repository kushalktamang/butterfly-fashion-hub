import type { Document } from "mongoose";
import { Model, Types } from "mongoose";

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

interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  bestSeller: boolean;
  date: Date;
}

export interface ProductDocument extends Product, Document {}

export interface IAdmin {
  email: string;
  password: string;
  role: string;
}

export interface IAdminDocument extends IAdmin, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type IAdminModel = Model<IAdminDocument>;
