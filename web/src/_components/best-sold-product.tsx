import { useShopContext } from "../hooks/use-shop-context";
import ProductItem from "./product-item";
import Title from "./title";

const BestSeller = () => {
  const { products } = useShopContext();

  const bestSellers = products.filter((item) => item.bestseller).slice(0, 5);
  return (
    <>
      <div className="my-10 px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-50">
        <div className="text-center">
          <Title textOne="Best" textTwo="Sellers" />
        </div>
        {/* rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-5">
          {bestSellers.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BestSeller;
