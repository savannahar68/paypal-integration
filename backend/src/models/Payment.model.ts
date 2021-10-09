import { Schema, model } from "mongoose";

export enum PaymentStatus {
  CAPTURED = "CAPTURED",
  ERROR = "ERROR",
}
export interface ISinglePayment {
  paymentid: string;
  studentId: string;
  Id: string;
  merchant: string;
  orderId: string;
  paymentDetails: any;
}

const PaymentSchema = new Schema(
  {
    paymentid: {
      type: String,
      required: true,
    },
    Id: { type: String, required: true },
    studentId: { type: String, required: true },
    merchant: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    paymentDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    // This is very important
    // Mongoose with record
    // 1. ORDER CREATED TIME
    // 2. ORDER UPDATED TIME
    timestamps: true,
  }
);

const PaymentModel = model<ISinglePayment>("payment", PaymentSchema);

export const addPayment = (paymentDetails: ISinglePayment) => {
  const paymentModel = new PaymentModel(paymentDetails);
  return paymentModel.save();
};

export const fetchPaymentDetailsById = (id: string) =>
  PaymentModel.findById(id);

export default PaymentModel;
