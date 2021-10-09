import axios from "axios";

/**
 * Calls the backend order route
 * @param id ID of some item for which user is making a payment
 * @param currency In USD as string
 */
export const generateOrder = async (id: string, currency = "USD") => {
  const response = await axios.post(`/order/paypal/${id}`, {
    currency,
  });
  return response.data.id;
};

/**
 * Calls the backend to store payment info
 * @param order_id Order Id of paypal payment
 */
export const recievePayment = async (orderId: string, paymentId: string) => {
  const response = await axios.post(`/payment/paypal`, {
    orderId,
    paymentId,
  });
  return response.data;
};
