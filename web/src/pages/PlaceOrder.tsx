import { useState } from "react";
import Title from "../_components/title";
import CartTotal from "../_components/cart-total";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useShopContext } from "../hooks/use-shop-context";
import { Loader2, Truck, CreditCard, User, Home, Phone } from "lucide-react";
import { assets } from "../assets/assets";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Something went wrong");
      } else {
        console.log(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-cream px-4 py-8 sm:px-10 sm:py-14 lg:px-12 lg:mt-10">
      <div className="mb-8 flex w-full justify-center">
        <Link to={"/"}>
          <img
            src={assets.butterfly_logo}
            alt="butterfly fashion hub logo"
            aria-label="butterfly fashion hub logo"
            className="w-50 cursor-pointer"
          />
        </Link>
      </div>
      <form
        onSubmit={(e) => {
          void onSubmitHandler(e);
        }}
        className="mx-auto flex justify-center items-center w-full max-w-7xl flex-col overflow-hidden rounded border border-gray-200 bg-cream shadow-sm lg:flex-row"
      >
        {/* =====================================================
            LEFT SIDE - DELIVERY INFORMATION
        ====================================================== */}
        <div className="w-full p-6 sm:p-8 lg:w-1/2 lg:border-r lg:border-gray-200">
          <div className="mb-6 flex items-center gap-2">
            <Truck className="h-10 w-10 text-gray-500" />

            <div className="text-xl sm:text-2xl">
              <Title textOne="DELIVERY" textTwo="INFORMATION" />
            </div>
          </div>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500"
              >
                <User className="h-3.5 w-3.5" />
                Full Name
              </label>

              <input
                id="name"
                required
                onChange={onChangeHandler}
                name="name"
                value={formData.name}
                type="text"
                placeholder="Nihesh Bastola"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* Street */}
            <div>
              <label
                htmlFor="street"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500"
              >
                <Home className="h-3.5 w-3.5" />
                Street Address
              </label>

              <input
                id="street"
                required
                onChange={onChangeHandler}
                name="street"
                value={formData.street}
                type="text"
                placeholder="Bastola Thar"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>

            {/* City + State */}
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
              <div className="w-full">
                <label htmlFor="city" className="mb-1.5 block text-xs font-medium text-gray-500">
                  City
                </label>

                <input
                  id="city"
                  required
                  onChange={onChangeHandler}
                  name="city"
                  value={formData.city}
                  type="text"
                  placeholder="Pokhara"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-pink-100"
                />
              </div>

              <div className="w-full">
                <label htmlFor="state" className="mb-1.5 block text-xs font-medium text-gray-500">
                  State
                </label>

                <input
                  id="state"
                  required
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  type="text"
                  placeholder="Bagmati"
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-pink-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500"
              >
                <Phone className="h-3.5 w-3.5" />
                Phone Number
              </label>

              <input
                id="phone"
                required
                onChange={onChangeHandler}
                name="phone"
                value={formData.phone}
                type="tel"
                placeholder="98XXXXXXXX"
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-pink-100"
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE - CART + PAYMENT
        ====================================================== */}
        <div className="w-full p-6 sm:p-8 lg:w-1/2">
          {/* Cart */}
          <CartTotal />

          {/* Payment */}
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-10 w-10 text-gray-500" />

              <Title textOne="PAYMENT" textTwo="METHOD" />
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-3">
              <div className="flex w-fit items-center gap-3 rounded-full border border-pink-300 bg-pink-50 px-4 py-2.5">
                <span className="h-3.5 w-3.5 rounded-full border border-fuchsia-400 bg-fuchsia-300" />

                <span className="text-sm font-medium text-gray-600">CASH ON DELIVERY</span>
              </div>
            </div>

            {/* Place Order */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}

                {isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
