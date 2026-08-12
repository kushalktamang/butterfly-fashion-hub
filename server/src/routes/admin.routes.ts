import { Router } from "express";
import adminLogin from "../controllers/admin.controller";

export const AdminRouter = (): Router => {
  const adminRoute: Router = Router();

  /*  POST api/auth/login */
  adminRoute.post("/login", adminLogin);

  return adminRoute;
};
