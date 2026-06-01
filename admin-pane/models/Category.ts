import mongoose, { Schema, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

export const Category = models.Category || mongoose.model("Category", CategorySchema);