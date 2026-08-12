import type { NextFunction, Request, Response } from "express";
import Order from "../model/order.model";
import { v4 as uuidv4 } from "uuid";

interface OrderItemInput {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string | string[];
}

interface AddressInput {
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

interface PlaceOrderBody {
  items: OrderItemInput[];
  amount: number;
  address: AddressInput;
}

interface UpdateStatusBody {
  orderId: string;
  status: string;
}

// placing an order using cash on delivery
const placeOrder = async (
  req: Request<unknown, unknown, PlaceOrderBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { items, amount, address } = req.body;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      !amount ||
      !address.street ||
      !address.city
    ) {
      res.status(400).json({
        success: false,
        message: "Items, amount and address are required",
      });
      return;
    }

    const orderNumber = uuidv4().slice(0, 8).toUpperCase();

    const orderData = {
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
      orderNumber,
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Order placed",
      orderNumber: newOrder.orderNumber,
      order: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

// getting all orders for the admin panel
const allOrders = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    next(error);
  }
};

// updating order status from admin
const updateStatus = async (
  req: Request<unknown, unknown, UpdateStatusBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      res.status(400).json({
        success: false,
        message: "orderId and status are required",
      });
      return;
    }

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true },
    );

    if (!updated) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    next(error);
  }
};

// deleting an order
const deleteOrder = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    const removed = await Order.findByIdAndDelete(id);

    if (!removed) {
      res.status(404).json({ success: false, message: "Order not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Order deleted" });
  } catch (error) {
    next(error);
  }
};

export { placeOrder, allOrders, updateStatus, deleteOrder };
