import Title from "./title";
import { useShopContext } from "../hooks/use-shop-context";
import ProductItem from "./product-item";

const LatestCollection = () => {
  const { products } = useShopContext();

  const latestProducts = [...products].sort((a, b) => b.date - a.date).slice(0, 5);

  return (
    <>
      <div className="my-10 px-5 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div className="text-center">
          <Title textOne="Latest" textTwo="Products" />
        </div>
        {/* rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 gap-y-6">
          {latestProducts.map((item) => (
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

export default LatestCollection;
