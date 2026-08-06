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
