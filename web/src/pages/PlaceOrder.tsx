import { useState } from "react";
import Title from "../_components/title";
import CartTotal from "../_components/cart-total";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useShopContext } from "../hooks/use-shop-context";

interface PlaceOrderResponse {
  success: boolean;
  orderNumber: string;
  message?: string;
}

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { backendUrl, cartItems, setCartItems, getCartAmount, delivery_fee, products } =
    useShopContext();
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    phone: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderItem: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        size: string;
      }[] = [];

      for (const productId in cartItems) {
        const sizeQuantities = cartItems[productId];
        if (!sizeQuantities) continue;

        for (const size in sizeQuantities) {
          const qty = sizeQuantities[size];
          if (qty !== undefined && qty > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              orderItem.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: qty,
                size,
              });
            }
          }
        }
      }
      const orderData = {
        address: formData,
        items: orderItem,
        amount: getCartAmount() + delivery_fee,
      };
      try {
        const response = await axios.post<PlaceOrderResponse>(
          `${backendUrl}/orders/place`,
          orderData,
        );

        if (response.data.success) {
          setCartItems({});
          void navigate("/order", {
            state: {
              orderData: {
                orderNumber: response.data.orderNumber,
                items: orderData.items,
                amount: orderData.amount,
                address: orderData.address,
              },
            },
          });
          toast.success("Order placed successfully!");
        } else {
          toast.error(response.data.message ?? "Order failed");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          console.log(error);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Something went wrong");
      } else {
        console.log(error);
      }
    }
  };
  return (
    <form
      onSubmit={(e) => void onSubmitHandler(e)}
      className="flex flex-col sm:flex-row justify-between gap-4 px-10 lg:px-20 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/*   ------------left side--------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120 bg-white-300 p-5 rounded shadow">
        <div className="text-xl sm:text-2xl my-3">
          <Title textOne={"DELIVERY"} textTwo={"INFORMATION"} />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="name"
          value={formData.name}
          type="text"
          placeholder="Full name"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone number"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* -----------right side------ */}
      <div className="bg-white-300 p-5 rounded shadow">
        <div className="mt-8 min-w-80 pr-10">
          <CartTotal />
        </div>

        <div className="mt-12">
          <div className="text-center">
            <Title textOne={"PAYMENT"} textTwo={"METHOD"} />
          </div>

          {/* ----------payment method-------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="flex items-center gap-3 border p-2 px-3 rounded-4xl bg-pink-50 border-pink-300">
              <p className="min-w-3.5 h-3.5 border rounded-full bg-fuchsia-300"></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-pink-500 text-white text-sm my-8 px-8 py-3 rounded-4xl hover:bg-pink-700 items-center"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
