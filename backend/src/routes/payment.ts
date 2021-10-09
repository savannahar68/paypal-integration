import * as express from "express";
import { addPayment, ISinglePayment } from "../models/Payment.model";
import { OrderStatus, updateOrderStatus } from "../models/Order.model";
import { fetchOrder, fetchPayment } from "../utils/paypal";

const getPaymentRoutes = (): express.Router => {
  const router = express.Router();

  // Ideally we should add a auth middleware for all the critical routes where authenticaion is needed.
  // Skipping it
  router.post("/paypal", async (req, res) => {
    const paymentDetails = req.body;
    const orderId = paymentDetails.orderId;
    const paymentId = paymentDetails.paymentId;
    const orderAndPaymentIdObject = { orderId, paymentId };
    try {
      /**
       * Verifying paypal payment is a 2 step process
       * 1. Verify if the order is completed using order Id
       * 2. Verify if the payment is completed using payment Id
       *
       * Once step 1 and 2 are verified
       * Modify the status of Orders table to completed
       * Store the payment details in Payments table
       */
      const orderObject = await fetchOrder(orderId);
      if (orderObject.statusCode == "500") {
        console.log({
          level: "error",
          message: "[payment.ts] /paypal (fetch order)",
          metadata: orderAndPaymentIdObject,
        });
        return res.status(500).json({
          notice:
            "Error while fetching order status from paypal. Check with XYZ team if amount is debited from your bank!",
        });
      } else if (orderObject.status !== "COMPLETED") {
        console.log({
          level: "error",
          message: "[payment.ts] /paypal (paypal payment not completed)",
          metadata: orderAndPaymentIdObject,
        });
        return res.status(500).json({
          notice:
            "Paypal order status is not Completed. Check with XYZ team if amount is debited from your bank!",
        });
      } else {
        // Update Orders table's status to Completed for the above order id
        const updatedOrder = await updateOrderStatus(
          orderId,
          OrderStatus.COMPLETE,
          paymentId
        );
        // Fetch payment details and if completed store it in database table
        const paymentObject = await fetchPayment(paymentId);
        if (paymentObject.statusCode == "500") {
          console.log({
            level: "error",
            message: "[payment.ts] /paypal (paypal fetching payment issue)",
            metadata: orderAndPaymentIdObject,
          });
          return res.status(500).json({
            notice:
              "Error while fetching payment status from paypal. Check with XYZ team if amount is debited from your bank!",
          });
        } else if (paymentObject.result.status !== "COMPLETED") {
          console.log({
            level: "error",
            message:
              "[payment.ts] /paypal (paypal fetching returned incomplete)",
            metadata: orderAndPaymentIdObject,
          });
          return res.status(500).json({
            notice:
              "Paypal payment status is not Completed. Please complete your payment!",
          });
        } else {
          const paymentDetails: ISinglePayment = {
            paymentid: paymentId,
            studentId: updatedOrder.studentId,
            orderId: orderId,
            Id: updatedOrder.Id,
            paymentDetails: paymentObject.result,
            merchant: "Paypal",
          };

          const paymentInfo = await addPayment(paymentDetails);
          console.log({
            level: "info",
            message: "[payment.ts] /paypal (payment successful)",
            metadata: orderAndPaymentIdObject,
          });
          // In production push a message to SQS to mail user for successful payment
          return res
            .status(200)
            .json({ message: "Transaction Successful", id: paymentInfo.id });
        }
      }
    } catch (error) {
      console.log({
        level: "error",
        message: "[payment.ts] /paypal (paypal processing issue)",
        metadata: orderAndPaymentIdObject,
      });
      return res.status(500).json({
        notice:
          "Payment processing failed! If money is deducted contact XYZ team, else try again!",
      });
    }
  });
  return router;
};

export default getPaymentRoutes;
