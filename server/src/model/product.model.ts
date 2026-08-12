import mongoose, { Schema } from "mongoose";
import { ProductDocument } from "../types/schema.types";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
  },
  description: {
    type: String,
    required: [true, "Prdouct description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },
  image: {
    type: [String],
    required: [true, "Product image is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  subCategory: {
    type: String,
    required: [true, "Product subCategory is also required"],
  },
  sizes: {
    type: [String],
    required: [true, "Product sizes is also required"],
  },
  bestSeller: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
