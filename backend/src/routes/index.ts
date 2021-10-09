import * as express from "express";
import getOrderRoutes from "./order";
import getPaymentRoutes from "./payment";

const getRoutes = (): express.Router => {
  return express
    .Router()
    .use("/order", getOrderRoutes())
    .use("/payment", getPaymentRoutes());
};

export default getRoutes;
