import React, { useState, useMemo, use } from "react";
import { ShopContext } from "../context/shop-context";
import { assets } from "../assets/assets";
import Title from "../_components/title";
import ProductItem from "../_components/product-item";
import { useLocation } from "react-router-dom";

// Type definitions
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
}

interface ShopContextType {
  products: Product[];
  search: string;
  showSearch: boolean;
}

type SortOption = "relavent" | "low-high" | "high-low";

type event = React.ChangeEvent<HTMLInputElement>;

const Collection: React.FC = () => {
  const { products, search, showSearch } = use(ShopContext) as ShopContextType;
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("relavent");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const defaultCategory = params.get("category");
  const [category, setCategory] = useState<string[]>(defaultCategory ? [defaultCategory] : []);
  const [showFilter, setShowFilter] = useState<boolean>(!!defaultCategory);

  // categories toggle option
  const toggleCategory = (e: event): void => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  // subcategory toggle option
  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const filterProducts = useMemo(() => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productCopy = productCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sortOption === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    return productCopy;
  }, [category, subCategory, sortOption, products, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-col md:flex-row gap-1 sm-gap-10 px-4 sm:px-[5vw] md:px-[4vw] lg:px-[4vw]">
      {/* filter  Option */}
      <div className="min-w-60 mt-5">
        <p
          onClick={() => {
            setShowFilter(!showFilter);
          }}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            className={`h-3 md:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown icon"
          />
        </p>
        {/* categories to filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } md:block `}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {/* bags categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bags"}
                onChange={toggleCategory}
                checked={category.includes("Bags")}
              />
              Bags
            </p>
            {/* bra categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bra"}
                checked={category.includes("Bra")}
                onChange={toggleCategory}
              />
              Bra
            </p>
            {/* panties categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Panties"}
                checked={category.includes("Panties")}
                onChange={toggleCategory}
              />
              Panties
            </p>
            {/* nightwear categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Nightwear"}
                checked={category.includes("Nightwear")}
                onChange={toggleCategory}
              />
              Nightwear
            </p>
            {/* pajama categories  */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Pajama"}
                checked={category.includes("Pajama")}
                onChange={toggleCategory}
              />
              Pajama
            </p>
            {/* scarf categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Scarf"}
                checked={category.includes("Scarf")}
                onChange={toggleCategory}
              />
              Scarf
            </p>
            {/* Socks categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Socks"}
                checked={category.includes("Socks")}
                onChange={toggleCategory}
              />
              Socks
            </p>
            {/* theral  sets collection */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Thermal"}
                checked={category.includes("Thermal")}
                onChange={toggleCategory}
              />
              Thermal
            </p>
            {/* Accessories categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Accessories"}
                checked={category.includes("Accessories")}
                onChange={toggleCategory}
              />
              Accessories
            </p>
          </div>
        </div>
        {/* subCategories filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } md:block `}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {/* topwear categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            {/* bottom categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            {/* winter categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"WinterWear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
            {/* summer categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Summerwear"}
                onChange={toggleSubCategory}
              />
              Summerwear
            </p>
            {/*  Other categories */}
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Others"}
                onChange={toggleSubCategory}
              />
              Others
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* right side */}
      {/* ------------------------------------------------------------------------- */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title textOne={"All"} textTwo={"Products"} />
          {/* products filtering option */}
          <select
            className="border-0 outline-none focus:outline-none focus:ring-0 ring-0 shawow-none"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value as SortOption);
            }}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* mapping all the products to display */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-10 gap-y-6 sm:px-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item._id}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
