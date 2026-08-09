import { useMemo } from "react";
import Title from "../_components/title";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../_components/cart-total";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../hooks/use-shop-context";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useShopContext();
  const navigate = useNavigate();

  const cartData = useMemo(() => {
    const tempData = [];
    for (const items in cartItems) {
      const sizeQuantities = cartItems[items];
      if (!sizeQuantities) continue;
      for (const item in sizeQuantities) {
        const qty = sizeQuantities[item];
        if (qty !== undefined && qty > 0) {
          tempData.push({
            _id: items,
            sizes: item,
            quantity: qty,
          });
        }
      }
    }
    return tempData;
  }, [cartItems]);

  return (
    <>
      <div className="pt-14 px-10 pb-[30vh]">
        <div className="text-2xl mb-3 ">
          <Title textOne={"Your"} textTwo={"Items"} />
        </div>

        {/* ---------- product entries------------ */}
        <div>
          {cartData.map((item) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;
            return (
              <div
                key={item._id}
                className="py-4 border-b border-t border-t-fuchsia-400 border-b-fuchsia-400 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img src={productData.image[0]} alt="productimage" className="w-16 sm:w-20" />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2 ">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border-grey  bg-pink-100 rounded">
                        {item.sizes}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    if (e.target.value === " " || e.target.value === "0") return;
                    void updateQuantity(item._id, item.sizes, Number(e.target.value));
                  }}
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className=" max-w-10 sm:max-w-20 px-1 sm:px-2  py-1 border border-fuchsia-800"
                />
                <RiDeleteBin6Line
                  onClick={() => {
                    void updateQuantity(item._id, item.sizes, 0);
                  }}
                  className="w-4 h-5 mr-4 sm:w-5 cursor-pointer"
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-end my-20">
          <div className=" w-full sm:w-112.5">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => {
                  if (cartData.length > 0) void navigate("/place-order");
                }}
                disabled={cartData.length === 0}
                className={`text-white text-sm my-8 px-8 py-3 rounded-4xl ${
                  cartData.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-charcol"
                }`}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
