import { useLocation, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle2, Package, MapPin, Phone, User } from "lucide-react";
import Title from "../_components/title";

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

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cream px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Success header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
            <CheckCircle2 className="h-9 w-9 text-pink-600" strokeWidth={1.75} />
          </div>
          <div className="text-3xl font-bold">
            <Title textOne={"ORDER"} textTwo={"SUCCESSFUL"} />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Thank you for your order. We'll contact you shortly to confirm delivery.
          </p>
        </div>

        {/* Order card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Order number strip */}
          <div className="flex items-center justify-between bg-charcol px-6 py-4">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Order Number
            </span>
            <span className="font-mono text-sm font-semibold text-white">{orderNumber}</span>
          </div>

          <div className="divide-y divide-gray-100">
            {/* Shipping details */}
            <div className="px-6 py-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-pink-600">
                <MapPin className="h-4 w-4" />
                Shipping Details
              </h3>
              <dl className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <User className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <span>{displayName}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <span>{addressLine || "-"}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <span>{address.phone ?? "-"}</span>
                </div>
              </dl>
            </div>

            {/* Items */}
            <div className="px-6 py-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-pink-600">
                <Package className="h-4 w-4" />
                Items ({itemCount})
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item._id} className="flex items-center justify-between text-sm">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-xs text-gray-500">
                        Qty {item.quantity}
                        {item.size ? ` · Size ${item.size}` : ""}
                      </span>
                    </div>
                    {typeof item.price === "number" && (
                      <span className="font-medium text-gray-800">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between bg-gray-50 px-6 py-4">
              <span className="text-sm font-semibold text-gray-600">Total Amount</span>
              <span className="text-lg font-bold text-pink-600">Rs. {amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/collection"
            className="rounded-full bg-charcol px-8 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Order;
