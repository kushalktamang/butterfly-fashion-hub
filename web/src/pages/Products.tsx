import { useParams } from "react-router-dom";
import { useShopContext } from "../hooks/use-shop-context";
import { useState } from "react";
import RelatedProducts from "../_components/related-product";
import { toast } from "react-toastify";

const Products = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, currency, addToCart, cartItems, isProductsLoading } = useShopContext();
  const product = products.find((item) => item._id === productId);

  const [image, setImage] = useState<string>(() => product?.image[0] ?? "");
  const [size, setSize] = useState<string>(() => product?.sizes[0] ?? "default");
  const [quantity, setQuantity] = useState<number>(1);

  if (!productId) return null;
  if (isProductsLoading) {
    return <div className="text-center py-20 text-gray-500">Loading product...</div>;
  }
  if (product === undefined) {
    return <div className="text-center py-20 text-gray-500">Product not found.</div>;
  }

  const rawStock = product.quantity;
  const stock: number = Number.isNaN(rawStock) || rawStock < 0 ? 0 : rawStock;
  const existingQty: number = cartItems[product._id]?.[size] ?? 0;
  const availableToAdd: number = Math.max(0, stock - existingQty);
  const limitReached: boolean = availableToAdd === 0;
  const displayedQuantity = Math.max(1, Math.min(quantity, Math.max(1, availableToAdd)));

  return (
    <div className="pt-10 px-4 sm:px-6 lg:px-20 xl:px-40">
      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left: Images */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4 md:gap-6 items-stretch">
          {/* Thumbnails */}
          <div className="flex flex-row md:flex-col gap-3 md:w-24 md:max-h-125 md:overflow-y-auto">
            {product.image.map((item, index) => (
              <img
                key={item}
                src={item}
                onClick={() => {
                  setImage(item);
                }}
                alt={`Thumbnail ${String(index + 1)}`}
                className="w-20 h-20 md:w-full md:h-auto aspect-square object-cover rounded-md cursor-pointer"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center items-center">
            <img
              src={image}
              alt="Main product image"
              className="w-full h-auto md:h-125 rounded-lg shadow object-cover"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-3xl font-bold mt-4">
            {currency}
            {product.price}
          </p>

          {/* Description */}
          <p className="mt-4 text-gray-600 text-sm sm:text-base">{product.description}</p>

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="mt-6">
              <p className="mb-2 font-medium">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSize(item);
                    }}
                    className={`border rounded px-4 py-2 text-sm sm:text-base transition-all ${
                      item === size
                        ? "border-pink-500 bg-[#ee78d0] text-white"
                        : "bg-gray-100 hover:border-gray-400"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock & Quantity */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-sm font-medium ${
                  stock === 0 ? "text-red-600" : stock <= 2 ? "text-amber-600" : "text-gray-600"
                }`}
              >
                {stock === 0
                  ? "Out of stock"
                  : stock <= 2
                    ? `Only ${String(stock)} left in stock`
                    : `${String(stock)} in stock`}
              </span>
              {existingQty > 0 && (
                <span className="text-sm text-gray-500">
                  ({existingQty} already in cart for this size)
                </span>
              )}
            </div>

            {stock > 0 && (
              <div>
                <p className="mb-2 font-medium text-gray-800">Quantity</p>
                <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((prev) => Math.max(1, prev - 1));
                    }}
                    disabled={displayedQuantity <= 1}
                    className="px-4 py-2.5 text-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, availableToAdd)}
                    value={displayedQuantity}
                    onChange={(e) => {
                      const raw = Number(e.target.value);
                      const val = Math.max(
                        1,
                        Math.min(availableToAdd, Number.isNaN(raw) ? 1 : raw),
                      );
                      setQuantity(val);
                    }}
                    className="w-14 text-center border-x border-gray-300 py-2.5 text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#ee78d0]/30 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                    inputMode="numeric"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((prev) => Math.min(availableToAdd, prev + 1));
                    }}
                    disabled={displayedQuantity >= availableToAdd}
                    className="px-4 py-2.5 text-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                {availableToAdd < stock && (
                  <p className="mt-1.5 text-xs text-gray-500">
                    You can add up to {availableToAdd} more (max {stock} in stock).
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => {
              if (limitReached) {
                toast.error(
                  availableToAdd === 0 && existingQty > 0
                    ? `You already have ${String(existingQty)} in cart for this size. Max ${String(stock)} in stock.`
                    : `Only ${String(stock)} item${stock !== 1 ? "s" : ""} available in stock.`,
                );
                return;
              }
              void addToCart(product._id, size, displayedQuantity);
            }}
            disabled={!size || stock === 0 || limitReached}
            className={`mt-6 w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold transition-all ${
              !size || stock === 0 || limitReached
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#ee78d0] text-white hover:bg-pink-600 active:bg-pink-700"
            }`}
          >
            {limitReached ? "OUT OF STOCK" : "ADD TO CART"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        currentProductId={product._id}
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Products;
