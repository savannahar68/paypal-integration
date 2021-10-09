import PaypalButtonWrapper from "../components/Paypal";

const Paypal = () => {
  return (
    <>
      <div className="justify-center text-center align-center mt-96">
        <PaypalButtonWrapper Id="123" currency="USD" />
      </div>
    </>
  );
};

export default Paypal;
