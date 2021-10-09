import { Schema, model } from "mongoose";

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  DISPATCHED = "DISPATCHED",
  COMPLETE = "COMPLETE",
}

export interface ISingleOrder {
  orderId: string;
  Id: string;
  studentId: string;
  paymentId?: string;
  merchant: string;
  amount: string;
  status: OrderStatus;
  orderDetails: any;
}

const OrderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    Id: { type: String, required: true },
    studentId: { type: String },
    paymentId: {
      type: String,
      required: false, // When this is not present we know that the payment isnt even initialted
    },
    merchant: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "DISPATCHED", "COMPLETE"],
      required: true,
    },
    orderDetails: {
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

const OrderModel = model<ISingleOrder>("order", OrderSchema);

export const addOrder = (orderDetails: ISingleOrder) => {
  const orderModel = new OrderModel(orderDetails);
  orderModel.save();
};

export const updateOrderStatus = (
  orderId: string,
  status: OrderStatus,
  paymentId: string
) => {
  return OrderModel.findOneAndUpdate(
    { orderId },
    {
      status,
      paymentId,
    }
  );
};

export default OrderModel;
