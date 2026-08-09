import { useLocation, useNavigate } from "react-router-dom";
import Title from "../_components/title";
import { useEffect } from "react";

export interface CartItem {
  _id: string;
  name: string;
  quantity: number;
  size?: string;
  price?: number;
}

interface Address {
  name?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  phone?: string;
}

interface OrderData {
  orderNumber: string;
  items: CartItem[];
  amount: number;
  address: Address;
}

interface OrderLocationState {
  orderData?: OrderData;
}

const Order = () => {
  const { state } = useLocation() as { state: OrderLocationState | null };
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.orderData) {
      void navigate("/");
    }
  }, [state, navigate]);

  if (!state?.orderData) {
    return null;
  }

  const { orderNumber, items, amount, address } = state.orderData;

  const fullName = `${address.firstName ?? ""} ${address.lastName ?? ""}`.trim();
  const displayName = address.name ?? (fullName || "-");

  const addressLine = [address.street, address.city, address.state].filter(Boolean).join(", ");

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-3xl font-bold text-center">
        <Title textOne={"ORDER"} textTwo={"SUCESSFULL"} />
      </div>
      <p className="mb-2 text-center">We will Contact you.</p>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <div className=" text-2xl">
          <p className="font-semibold">Order Number:</p>
          <p className="mb-4 text-pink-600">{orderNumber}</p>
          <p className="font-semibold text-pink-600 mb-1">Shipping Details:</p>
          <div className="mb-4">
            <p>
              <span>Name: </span>
              {displayName}
            </p>
            <p>
              <span>Address: </span>
              {addressLine || "-"}
            </p>
            <p>
              <span>Phone Number: </span>
              {address.phone ?? "-"}
            </p>
          </div>
          <p className="font-semibold mb-1 text-pink-600">Total Amount:</p>
          <p className="mb-4 ">Rs. {amount}</p>
          <p className="font-semibold mb-2 text-pink-600">Items:</p>
          <ul className="list-disc list-inside">
            {items.map((item: CartItem) => (
              <li key={item._id}>
                {item.name} (x{item.quantity})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Order;
