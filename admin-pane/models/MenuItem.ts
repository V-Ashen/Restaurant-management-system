import mongoose, { Schema, models } from "mongoose";

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  imageUrl: { type: String, default: "" },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export const MenuItem = models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);