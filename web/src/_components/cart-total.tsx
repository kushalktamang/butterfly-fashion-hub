import Title from "./title";
import { useShopContext } from "../hooks/use-shop-context";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useShopContext();

  return (
    <div className="">
      <div className="w-full">
        <div className="text-2xl">
          <Title textOne={"Cart"} textTwo={"Total"} />
        </div>

        <div className="flex flex-col gap-2 mt-2  text-sm">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>
              {currency} {getCartAmount().toFixed(2)}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <p>Delivery Charge</p>
            <p>
              {currency} {delivery_fee.toFixed(2)}
            </p>
          </div>
          <hr />
          <div className="flex justify-between">
            <b>Total</b>
            <b>
              {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
