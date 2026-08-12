import { Router } from "express";
import upload from "../middlewares/multer.middleware";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/products.controller";

export const createProductRouter = (): Router => {
  const productRoute: Router = Router();

  /*
  - adding any products
  POST /api/products/add
  */
  productRoute.post(
    "/add",
    upload.fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]),
    addProduct,
  );

  /*
  - removing a product
  POST /api/products/remove
  */
  productRoute.post("/remove", removeProduct);

  /*
  - getting a singe product
  POST /api/products/single
  */
  productRoute.post("/single", singleProduct);

  /*
  - getting all the product
  POST /api/products/list
  */
  productRoute.get("/list", listProduct);

  return productRoute;
};
