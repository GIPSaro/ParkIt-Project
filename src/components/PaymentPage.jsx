import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const url = import.meta.env.VITE_URL;
const token = localStorage.getItem("token");


const PaymentPage = ({ onPaymentSuccess, amount }) => {
  const handlePurchase = async (userId, payerEmail) => {
    const startDate = new Date(); 
    const endDate = new Date(startDate); 
    endDate.setFullYear(startDate.getFullYear() + 1);

    const requestBody = {
        email: payerEmail,
        startDate: startDate.toISOString(), 
        endDate: endDate.toISOString(),   
        price: amount,
    };

    console.log("Request Body:", requestBody);
    try {
        const response = await fetch(`${url}annualCards/purchase/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error('Purchase request failed: ' + errorText);
        }

        const data = await response.json();
        console.log("Annual card purchased and saved:", data);
        onPaymentSuccess(); 
    } catch (error) {
        console.error("Error purchasing and saving annual card:", error);
        console.log('Error during the purchase. Please try again.');
    }
};


  
  const fetchUserId = async (payerEmail) => {
    try {
      const response = await fetch(`${url}users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user: ' + response.statusText);
      }
  
      const user = await response.json();
      handlePurchase(user.id, payerEmail); 
      console.log("User fetched with ID:", user.id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      console.log('Error fetching user profile. Please try again.');
    }
  };
  

  return (
    <PayPalScriptProvider options={{ "client-id": "AUT-mOa9YZhkyt96iTdCCIjZWNW6q_vlzFEwsxFBw3OG3v5TKKIkoc30QKCYRWiF_hmCnhN4AdHylk8Y" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toString(),
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const payerEmail = details.payer.email_address;
           console.log(`Transaction completed by ${payerEmail}`);
            console.log(details);

            
            fetchUserId(payerEmail);
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PaymentPage;
