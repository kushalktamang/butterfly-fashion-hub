import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";
import { emailRegex } from "../utils/email";
import { IAdminDocument, IAdminModel } from "../types/schema.types";

const adminSchema = new Schema<IAdminDocument>(
  {
    email: {
      type: String,
      required: [true, "Admin email is required"],
      unique: [true, "user already exists, choose another email."],
      trim: true,
      lowercase: true,
      match: [emailRegex, "Please fill up a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Admin password is required"],
      minLength: 6,
      select: false,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        delete ret["password"];
        return ret;
      },
    },
  },
);

adminSchema.pre("save", async function (this: IAdminDocument) {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods["comparePassword"] = async function (
  this: IAdminDocument,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const Admin: IAdminModel = mongoose.model<IAdminDocument, IAdminModel>(
  "Admin",
  adminSchema,
);

export default Admin;
