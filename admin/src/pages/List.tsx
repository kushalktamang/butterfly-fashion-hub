import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import assets from "../assets/assets.js";
import { useBackendContext } from "../hooks/use-bakend-context";
import type {
  ListProductResponse,
  Product,
  ProductErrorPayload,
  ProductResponse,
} from "../types/product.js";
import { getErrorMessage } from "../utils/get-error-message.js";

const List: React.FC = () => {
  const { BackendUrl, currency } = useBackendContext();
  const [list, setList] = useState<Product[]>([]);

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get<ListProductResponse>(`${BackendUrl}/products/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message ?? "Failed to fetch products");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ProductErrorPayload>(error)) {
        toast.error(error.response?.data.message ?? error.response?.data.error ?? error.message);
      } else if (error instanceof Error) {
        toast.error(getErrorMessage(error));
      } else {
        console.error(error);
      }
    }
  }, [BackendUrl]);

  useEffect(() => {
    // Fetching from API is asynchronous; this does not synchronously update state in-effect.
    void fetchList();
  }, [fetchList]);

  const removeProduct = async (id: string) => {
    try {
      const response = await axios.post<ProductResponse>(
        `${BackendUrl}/products/remove`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message ?? "Product deleted");
        await fetchList();
      } else {
        toast.error(response.data.message ?? "Error occurred");
      }
    } catch (error) {
      if (axios.isAxiosError<ProductErrorPayload>(error)) {
        toast.error(error.response?.data.message ?? error.response?.data.error ?? error.message);
      } else if (error instanceof Error) {
        toast.error(getErrorMessage(error));
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">All Product List</h2>
      <div className="flex flex-col gap-2">
        {/* list table titles---------- */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-pink-100 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ---------- */}
        {/* product-list */}
        {/* ------------ */}

        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border border-pink-50 text-sm "
          >
            <img className="w-12" src={item.image[0] ?? assets.upload_area} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <button
              onClick={() => {
                void removeProduct(item._id);
              }}
              className="cursor-pointer"
            >
              <img src={assets.bin_icon} alt="delete-icon" className="w-5 h-5 " />
            </button>
          </div>
        ))}
        {list.length === 0 && <p className="text-sm text-gray-500 py-4">No products found.</p>}
      </div>
    </>
  );
};

export default List;
