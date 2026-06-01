import mongoose, { Schema, models } from "mongoose";

const ContactMessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false } // Helps admin track read/unread messages
}, { timestamps: true });

export const ContactMessage = models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);