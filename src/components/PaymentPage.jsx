import { useState } from "react";


const PaymentPage = ({ onPaymentSuccess, amount }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Seleziona il metodo di pagamento");
      return;
    }

    setPaymentInProgress(true);
    

    setTimeout(() => {
      setPaymentInProgress(false);
      onPaymentSuccess();
      alert(`Pagamento di €${amount} completato con successo!`);
    }, 2000); 
  };

  return (
    <div className="payment-method">
      <h2>Pagamento via Paypal</h2>
      <div>
        <label>
          <input
        type="radio"
            name="paymentMethod"
            value="paypal"
            checked={selectedMethod === "paypal"}
            onChange={() => setSelectedMethod("paypal")}
          />
          
          PayPal
          
        </label> 
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={handlePayment}
        disabled={paymentInProgress}
      >
        {paymentInProgress ? "Pagamento in corso..." : `Paga €${amount} con `} <img
            src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
            alt="PayPal"
            style={{ width: "70px"}}
          />
      </button>
    </div>
  );
};

export default PaymentPage;
