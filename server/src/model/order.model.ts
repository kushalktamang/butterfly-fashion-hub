import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import type { OrderDocument } from "../types/order.types";

const orderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    size: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    name: String,
    firstName: String,
    lastName: String,
    street: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    phone: String,
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    items: {
      type: [orderItemSchema],
      required: [true, "Items are required"],
    },
    amount: {
      type: Number,
      required: [true, "Items amount should be filled"],
    },
    address: {
      type: addressSchema,
      required: [true, "Address is required"],
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Order is placed",
        "Shipped",
        "Out for delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order is placed",
    },
    paymentMethod: {
      type: String,
      required: [true, "You have to choose your payment method"],
    },
    payment: {
      type: Boolean,
      required: [true, "You have to choose ur paymaent method"],
      default: false,
    },
    date: {
      type: Number,
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
      default: () => uuidv4().slice(0, 8).toUpperCase(), // makes an id of 8 digits
    },
  },
  { timestamps: true },
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);
export default OrderModel;
