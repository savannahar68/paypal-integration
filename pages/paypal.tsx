import { useContext, useState, useEffect } from "react";
import PaypalButtonWrapper from "../component/Paypal";

const Paypal = () => {
  return (
    <>
      <div className="h-screen text-center mt-96">
        <PaypalButtonWrapper Id="123" currency="USD" />
      </div>
    </>
  );
};

export default Paypal;
