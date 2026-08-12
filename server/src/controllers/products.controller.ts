import type { NextFunction, Request, Response } from "express";
import Product from "../model/product.model";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiOptions, UploadApiResponse } from "cloudinary";

interface AddProductBody {
  name: string;
  description: string;
  price: string;
  quantity: string;
  category: string;
  subCategory: string;
  sizes: string;
  bestSeller?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;

  if (error && typeof error === "object" && "message" in error) {
    return (error as { message?: string }).message ?? "Unknown error";
  }

  return "Unknown error";
};

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const uploadOptions: UploadApiOptions = {
    resource_type: "image",
  };

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, uploadedResult) => {
        if (error || !uploadedResult) {
          reject(new Error(`Cloudinary upload failed: ${getErrorMessage(error)}`));
          return;
        }

        resolve(uploadedResult);
      },
    );

    uploadStream.end(file.buffer);
  });

  return result.secure_url;
};

// ─────────────────────────────────────────────
// Add Product
// ─────────────────────────────────────────────
//validating and narrowing the parsed result
function parseSizes(sizes: unknown): string[] {
  if (typeof sizes !== "string") return [];

  const parsed: unknown = JSON.parse(sizes);

  if (!Array.isArray(parsed) || !parsed.every((s) => typeof s === "string")) {
    throw new Error("Invalid sizes format");
  }

  return parsed;
}

const addProduct = async (
  req: Request<unknown, unknown, AddProductBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, description, price, quantity, category, subCategory, sizes, bestSeller } =
      req.body;

    // checking if the required field is left empty
    if (!name || !description || !price || !quantity || !category || !subCategory || !sizes) {
      res.status(400).json({ success: false, message: "All fields are required" });
      return;
    }

    if (!req.files || Array.isArray(req.files)) {
      res.status(400).json({
        success: false,
        message: "Images are required",
      });
      return;
    }

    // Extract uploaded images
    const image1 = req.files["image1"]?.[0];
    const image2 = req.files["image2"]?.[0];
    const image3 = req.files["image3"]?.[0];
    const image4 = req.files["image4"]?.[0];

    const images = [image1, image2, image3, image4].filter((file): file is Express.Multer.File =>
      Boolean(file),
    );

    if (images.length === 0) {
      res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
      return;
    }

    // Upload to Cloudinary
    const imagesUrl = await Promise.all(images.map((item) => uploadImage(item)));

    // Build product object
    const productData = {
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      image: imagesUrl,
      category,
      subCategory,
      sizes: parseSizes(sizes),
      bestSeller: bestSeller === "true",
      date: Date.now(),
    };

    if (!Array.isArray(productData.sizes) || productData.sizes.length === 0) {
      res.status(400).json({
        success: false,
        message: "Please select at least one size",
      });
      return;
    }

    // Save to DB
    const product = new Product(productData);
    await product.save();

    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(400).json({
        success: false,
        message: "Invalid sizes format",
      });
      return;
    }

    if (getErrorMessage(error).toLowerCase().startsWith("cloudinary upload failed")) {
      res.status(502).json({
        success: false,
        message: getErrorMessage(error),
      });
      return;
    }

    next(error);
  }
};

// ─────────────────────────────────────────────
// List All Products
// ─────────────────────────────────────────────
const listProduct = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await Product.find().sort({ date: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// Remove Product
// ─────────────────────────────────────────────

interface RemoveProductBody {
  id: string;
}

const removeProduct = async (
  req: Request<unknown, unknown, RemoveProductBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: "Product ID is required" });
      return;
    }

    const removed = await Product.findByIdAndDelete(id);

    if (!removed) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Product removed" });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
// Get Single Product
// ─────────────────────────────────────────────

interface SingleProductBody {
  productId: string;
}

const singleProduct = async (
  req: Request<unknown, unknown, SingleProductBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { productId } = req.body;

    if (!productId) {
      res.status(400).json({ success: false, message: "Product ID is required" });
      return;
    }

    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
