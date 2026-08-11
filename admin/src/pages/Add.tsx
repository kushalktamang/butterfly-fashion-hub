import { useState } from "react";
import assets from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useBackendContext } from "../hooks/use-bakend-context";
import type { FormState, ProductErrorPayload, ProductResponse } from "../types/product";
import { getErrorMessage } from "../utils/get-error-message";

const Add: React.FC = () => {
  const { BackendUrl } = useBackendContext();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "Bags",
    subCategory: "Topwear",
    bestSeller: false,
    sizes: [],
  });

  const [images, setImages] = useState<(File | null)[]>([null, null, null, null]);

  const imageSlotIds = ["image1", "image2", "image3", "image4"] as const;

  const sizeOptions = ["S", "M", "L", "XL", "XXL"];
  const categories = [
    "Bags",
    "Bra",
    "Panties",
    "Nightwear",
    "Pajama",
    "Scarf",
    "Socks",
    "Thermal",
    "Accessories",
  ];
  const subCategories = ["Winterwear", "Bottomwear", "Topwear", "Summerwear", "Others"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSize = (size: string) => {
    setFormState((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageChange = (index: number, file: File | null) => {
    setImages((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });
  };

  const resetForm = () => {
    setFormState({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "Bags",
      subCategory: "Topwear",
      bestSeller: false,
      sizes: [],
    });
    setImages([null, null, null, null]);
  };

  const onSubmitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.description.trim()) {
      toast.error("Product description is required");
      return;
    }

    if (formState.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (!images.some(Boolean)) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      for (const key in formState) {
        const value = formState[key as keyof typeof formState];
        formData.append(key, key === "sizes" ? JSON.stringify(value) : String(value));
      }
      images.forEach((img, i) => {
        if (img) formData.append(`image${String(i + 1)}`, img);
      });

      const response = await axios.post<ProductResponse>(`${BackendUrl}/products/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message ?? "Product added successfully!");
        resetForm();
      } else {
        toast.error(response.data.message ?? "Something went wrong.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError<ProductErrorPayload>(error)) {
        toast.error(error.response?.data.message ?? error.response?.data.error ?? error.message);
      } else if (error instanceof Error) {
        toast.error(getErrorMessage(error));
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => void onSubmitHandler(e)}
      className="flex flex-col w-full items-start gap-4"
    >
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2.5">
          {images.map((img, index) => (
            <label htmlFor={imageSlotIds[index]} key={imageSlotIds[index]}>
              <img
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt={`upload area ${String(index)}`}
                className="w-20 h-20 object-cover"
              />
              <input
                type="file"
                id={`image ${String(index)}`}
                hidden
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(index, e.target.files?.[0] ?? null);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <label htmlFor="name" className="block mb-2">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
          type="text"
          placeholder="Type here"
          className="w-full max-w-125 px-3 py-2"
          required
        />
      </div>

      <div className="w-full">
        <label htmlFor="description" className="block mb-2">
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
          placeholder="Write content here"
          className="w-full max-w-125 px-3 py-2"
          required
        />
      </div>

      <div className="flex flex-wrap gap-4 w-full">
        <div>
          <label className="block mb-2">Category</label>
          <select
            name="category"
            value={formState.category}
            onChange={handleInputChange}
            className="px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">Sub Category</label>
          <select
            name="subCategory"
            value={formState.subCategory}
            onChange={handleInputChange}
            className="px-3 py-2"
          >
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block mb-2">
            Price
          </label>
          <input
            id="price"
            name="price"
            value={formState.price}
            onChange={handleInputChange}
            type="number"
            placeholder="25"
            className="px-3 py-2 w-30"
            required
          />
        </div>

        <div>
          <label htmlFor="quantity" className="block mb-2">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            value={formState.quantity}
            onChange={handleInputChange}
            type="number"
            placeholder="25"
            className="px-3 py-2 w-30"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {sizeOptions.map((size) => (
            <p
              key={size}
              onClick={() => {
                toggleSize(size);
              }}
              className={`cursor-pointer px-3 py-1 rounded ${
                formState.sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="bestSeller"
          name="bestSeller"
          checked={formState.bestSeller}
          onChange={handleInputChange}
        />
        <label htmlFor="bestSeller" className="cursor-pointer">
          Add to best seller
        </label>
      </div>

      <button
        type="submit"
        className="w-32 py-3 mt-4 bg-pink-600 text-white rounded flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        ) : (
          "Add Item"
        )}
      </button>
    </form>
  );
};

export default Add;
