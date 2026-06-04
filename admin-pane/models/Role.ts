import mongoose, { Schema, models } from "mongoose";

const RoleSchema = new Schema({
  name: { type: String, required: true, unique: true }, // e.g., "Cashier", "Shop Owner"
  level: { type: Number, required: true }, // 0 = Master, 1 = Admin, 2+ = Staff
  permissions: [{ type: String }] // e.g., ["view_dashboard", "manage_orders", "manage_menu"]
}, { timestamps: true });

export const Role = models.Role || mongoose.model("Role", RoleSchema);