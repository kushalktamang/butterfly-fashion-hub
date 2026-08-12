import { Router } from "express";
import { allOrders, deleteOrder, placeOrder, updateStatus } from "../controllers/order.controller";

export const createOrderRouter = (): Router => {
  const orderRoutes = Router();

  /*
  - cod or just placing order
  POST /api/orders/place
  */
  orderRoutes.post("/place", placeOrder);

  /*
  - getting all the order lists
  POST /api/orders/place
  */
  orderRoutes.get("/list", allOrders);

  /*
  -  backward-compatible alias
  POST /api/orders/place
  */
  orderRoutes.get("/lists", allOrders);

  /*
  - updating any orders list
  POST /api/orders/status
  */
  orderRoutes.post("/status", updateStatus);

  /*
  - for deleting orders
  POST /api/orders/:id
  */
  orderRoutes.delete("/:id", deleteOrder);

  return orderRoutes;
};
