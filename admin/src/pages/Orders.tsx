import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import { useBackendContext } from "../hooks/use-bakend-context";
import type { OrderProductResponse, Order, ProductResponse } from "../types/product.js";
import { getErrorMessage } from "../utils/get-error-message.js";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { BackendUrl, currency } = useBackendContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token") ?? "";
        const response = await axios.get<OrderProductResponse>(`${BackendUrl}/orders/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error(response.data.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(getErrorMessage(error));
        }
      }
    };

    void fetchOrders();
  }, [BackendUrl]);

  const deleteOrder = async (orderId: string) => {
    try {
      const token = localStorage.getItem("token") ?? "";
      const response = await axios.delete<ProductResponse>(`${BackendUrl}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Order deleted successfully");
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        toast.error(response.data.message ?? "Failed to delete order");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(getErrorMessage(error));
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Order Page</h2>
      <div>
        {orders.map((order) => {
          const displayName =
            (order.address.name ??
              `${order.address.firstName ?? ""} ${order.address.lastName ?? ""}`.trim()) ||
            "-";
          const addressLine = [
            order.address.city,
            order.address.state,
            order.address.country,
            order.address.zipcode,
          ]
            .filter(Boolean)
            .join(", ");

          return (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-pink-100 p-5 md:p-8 my-3 md-my-4 text-xs sm:text-sm text-gray-700 shadow"
              key={order._id}
            >
              <img className="mt-10 mr" src={assets.parcel_icon} alt="parcel-icon" />
              <div>
                <div>
                  {order.items.map((item, index, items) => (
                    <p className="py-0.5" key={item._id}>
                      {item.name} x {item.quantity}{" "}
                      <span>{Array.isArray(item.size) ? item.size.join(", ") : item.size}</span>
                      {index !== items.length - 1 && ","}
                    </p>
                  ))}
                </div>
                <p className="mt-3 mb-2 font-medium">
                  <span className="text-pink-500">Name: </span>
                  {displayName}
                </p>
                <div>
                  <p className="text-pink-500">Address</p>
                  <p>{order.address.street ?? "-"}</p>
                  <p>{addressLine || "-"}</p>
                  <p className="mt-2">
                    <span className="text-pink-500">Number: </span>
                    {order.address.phone ?? "-"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">Items {order.items.length}</p>
                <p className="mt-3">Method {order.paymentMethod}</p>
                {/* <p>Payment : {order.payment ? "Done" : "Pending"}</p> */}
                <p className="text-pink-500">Cash on Delivery</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm sm:text-[15px] flex justify-center mt-10">
                {currency} {order.amount}
              </p>
              <div className="flex flex-col items-center mt-8 gap-2">
                <p className="text-sm sm:text-[15px]">{order.orderNumber}</p>
                <button
                  className=" w-7 h-7 "
                  onClick={() => {
                    void deleteOrder(order._id);
                  }}
                >
                  <img src={assets.bin_icon} alt="delete" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Orders;
