import hero_img from "./hero_img.png";
import dropdown_icon from "./dropdown_icon.png";
import butterfly_logo from "./butterfly-logo.svg";

export const assets = {
  butterfly_logo,
  hero_img,
  dropdown_icon,
} as const;

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: ("S" | "M" | "L" | "XL" | "XXL" | "XXXL")[];
  date: number;
  bestseller: boolean;
  quantity: number;
}
