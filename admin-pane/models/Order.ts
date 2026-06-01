import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new Schema({
  customerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  tableOrAddress: { type: String, required: true }, // Matches "Table Number / Delivery Address"
  items: [{
    menuItem: { type: Schema.Types.ObjectId, ref: "MenuItem", required: true },
    quantity: { type: Number, required: true },
    priceAtTime: { type: Number, required: true } // Preserves historical price
  }],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'QR'], required: true },
  status: { type: String, enum: ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

export const Order = models.Order || mongoose.model("Order", OrderSchema);