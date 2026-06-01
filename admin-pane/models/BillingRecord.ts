import mongoose, { Schema, models } from "mongoose";

const BillingRecordSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid', 'Refunded'], default: 'Paid' },
}, { timestamps: true });

export const BillingRecord = models.BillingRecord || mongoose.model("BillingRecord", BillingRecordSchema);