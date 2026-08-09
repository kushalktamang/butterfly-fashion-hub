import { Link } from "react-router-dom";
import { useShopContext } from "../hooks/use-shop-context";

interface ProductDetails {
  id: string;
  image: string[];
  name: string;
  price: number;
}

const ProductItem = ({ id, image, name, price }: ProductDetails) => {
  const { currency } = useShopContext();
  return (
    <>
      <div className="text-gray-700 flex flex-col">
        <Link className="cursor-pointer" to={`/products/${id}`}>
          <div className="overflow-hidden">
            <img
              className="relative w-full h-auto max-h-60 sm:max-h-56 md:max-h-80 aspect-3/4 object-cover object-center rounded-md transition-transform duration-300 hover:scale-110"
              src={image[0]}
              alt="product image"
              aria-label="product image"
            />
          </div>
          <div className="flex flex-col justify-between mb-1">
            <span className="text-black text-sm pt-3 pb-1">{name}</span>
            <span className="font-medium text-gray-600">
              {currency} {price}
            </span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductItem;
