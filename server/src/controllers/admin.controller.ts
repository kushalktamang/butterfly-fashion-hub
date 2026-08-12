import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import AdminModel from "../model/admin.model";
import type { IAdmin } from "../types/schema.types";
import { ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } from "../config/env.config";

export type TRegisterBody = Pick<IAdmin, "email" | "password" | "role">;
export type TRequest = Request<unknown, unknown, TRegisterBody>;

const adminLogin = async (req: TRequest, res: Response): Promise<void> => {
  const jwt_secret = JWT_SECRET;
  if (!jwt_secret) {
    throw new Error("JWT_SECRET is not defined, check environment variable");
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required" });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    let admin = await AdminModel.findOne({ email: normalizedEmail }).select("+password");

    if (!admin) {
      const isEnvAdmin =
        Boolean(ADMIN_EMAIL) &&
        Boolean(ADMIN_PASSWORD) &&
        normalizedEmail === ADMIN_EMAIL.toLowerCase() &&
        password === ADMIN_PASSWORD;

      if (!isEnvAdmin) {
        res.status(401).json({ success: false, message: "Invalid credentials" });
        return;
      }

      admin = await AdminModel.create({
        email: normalizedEmail,
        password: ADMIN_PASSWORD,
        role: "admin",
      });
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ adminId: admin._id }, jwt_secret, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error: unknown) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? `Login failed: ${error.message}` : "Internal server error",
    });
  }
};

export default adminLogin;
