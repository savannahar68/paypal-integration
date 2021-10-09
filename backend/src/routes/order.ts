import * as express from "express";
import { OrderStatus, addOrder, ISingleOrder } from "../models/Order.model";
import { createOrder } from "../utils/paypal";

const getOrderRoutes = (): express.Router => {
  const router = express.Router();

  const getCourseFeeBasedOnCohort = (id: string): string => {
    console.log("Getting fees for ID: ", id);
    // Query database based on ID passed fetch the fees for the same
    return "200";
  };

  // Ideally we should add a auth middleware for all the critical routes where authenticaion is needed.
  // Skipping it
  router.post("/paypal/:id", async (req, res) => {
    try {
      const amount: string = getCourseFeeBasedOnCohort(req.params.id);
      const currency: string = req.body.currency;
      const response = await createOrder(amount, currency);
      if (response.statusCode !== 201) {
        console.log({
          level: "error",
          message: "[order.ts] /paypal/:cohortId (create order)",
          metadata: response,
        });
        return res.status(500).json({
          message: "Order creation failed at Paypal",
          notice:
            "Something went wrong while fetching order! Please try again later.",
        });
      } else {
        const orderDetails: ISingleOrder = {
          orderId: response.result.id,
          Id: req.params.id,
          studentId: "xyz", // Id of user should be fetched from the JWT of with the help of JWT
          amount: "" + amount,
          status: OrderStatus.PENDING,
          orderDetails: response.result,
          merchant: "Paypal",
        };

        await addOrder(orderDetails);
        return res.status(200).json(response.result);
      }
    } catch (err) {
      console.log({
        level: "error",
        message: "[order.ts] /paypal/:cohortId (send order)",
        metadata: { error: err, email: req.student.email },
      });
      return res.status(500).json({
        message: err.message,
        notice:
          "Something went wrong while fetching order! Please try again later.",
      });
    }
  });

  return router;
};

export default getOrderRoutes;
