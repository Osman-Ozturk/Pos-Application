import mongoose from "mongoose";

const BillSchema = mongoose.Schema(
  {
    customerName: { type: String, require: true },
    customerPhoneNumber: { type: String, require: true },
    paymentMethode: { type: String, require: true },
    subTotal: { type: Number, require: true },
    cartItems: { type: Array, require: true },
    totalAmount: { type: Number, require: true },
    tax: { type: Number, require: true },
  },
  { timestamps: true }
);
const Bill = mongoose.model("Bills", BillSchema);

export default Bill;
