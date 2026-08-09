import { useMemo } from "react";
import Title from "./title";
import ProductItem from "./product-item";
import { useShopContext } from "../hooks/use-shop-context";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
  subCategory: string;
}

const RelatedProducts = ({ currentProductId, category, subCategory }: RelatedProductsProps) => {
  const { products } = useShopContext();
  const related = useMemo(() => {
    if (products.length === 0) return [];

    return products
      .filter(
        (item) =>
          item._id !== currentProductId &&
          item.category === category &&
          item.subCategory === subCategory,
      )
      .slice(0, 5);
  }, [products, currentProductId, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title textOne={"Related"} textTwo={"Products"} />
      </div>
      {/* Scrollable on mobile */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 min-w-max sm:min-w-0">
          {related.map((item) => (
            <div key={item._id} className="w-37.5 sm:w-auto shrink-0">
              <ProductItem id={item._id} name={item.name} price={item.price} image={item.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
