import mongoose, { Schema, models } from "mongoose";

const AdminUserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "Role", required: true }, // Links to Role table
}, { timestamps: true });

export const AdminUser = models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);