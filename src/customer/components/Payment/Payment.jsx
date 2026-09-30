import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalAmount, orderData } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!orderData) {
      alert("Order information not found");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending order to backend...");
      console.log(orderData);

      const response = await fetch(
        "http://localhost:8081/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : "Order could not be placed"
        );
      }

      console.log("ORDER SUCCESS:", data);

      // Clear cart after successful payment
      localStorage.removeItem("cart");

      alert(
        `Demo Payment Successful!\n\nOrder #${data.id} placed successfully.`
      );

      navigate("/my-orders");

    } catch (error) {
      console.error("ORDER ERROR:", error);

      alert(
        error.message ||
        "Something went wrong while placing the order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!totalAmount || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold mb-4">
            Payment details not found
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-black text-white px-6 py-3 rounded"
          >
            Go Back to Checkout
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Payment
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* PAYMENT METHODS */}

          <div>

            <h2 className="text-xl font-semibold mb-5">
              Select Payment Method
            </h2>

            {/* UPI */}

            <div
              onClick={() => setPaymentMethod("UPI")}
              className={`border rounded-lg p-4 mb-4 cursor-pointer ${
                paymentMethod === "UPI"
                  ? "border-black bg-gray-50"
                  : "border-gray-300"
              }`}
            >

              <div className="flex items-center gap-3">

                <input
                  type="radio"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />

                <span className="font-semibold">
                  UPI
                </span>

              </div>

              {paymentMethod === "UPI" && (
                <input
                  type="text"
                  placeholder="Enter demo UPI ID"
                  className="border p-3 rounded w-full mt-4"
                />
              )}

            </div>


            {/* CARD */}

            <div
              onClick={() => setPaymentMethod("CARD")}
              className={`border rounded-lg p-4 mb-4 cursor-pointer ${
                paymentMethod === "CARD"
                  ? "border-black bg-gray-50"
                  : "border-gray-300"
              }`}
            >

              <div className="flex items-center gap-3">

                <input
                  type="radio"
                  checked={paymentMethod === "CARD"}
                  onChange={() => setPaymentMethod("CARD")}
                />

                <span className="font-semibold">
                  Card
                </span>

              </div>

              {paymentMethod === "CARD" && (
                <div className="mt-4 space-y-3">

                  <input
                    type="text"
                    placeholder="Demo Card Number"
                    className="border p-3 rounded w-full"
                  />

                  <div className="flex gap-3">

                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="border p-3 rounded w-1/2"
                    />

                    <input
                      type="text"
                      placeholder="CVV"
                      className="border p-3 rounded w-1/2"
                    />

                  </div>

                </div>
              )}

            </div>


            {/* COD */}

            <div
              onClick={() => setPaymentMethod("COD")}
              className={`border rounded-lg p-4 mb-4 cursor-pointer ${
                paymentMethod === "COD"
                  ? "border-black bg-gray-50"
                  : "border-gray-300"
              }`}
            >

              <div className="flex items-center gap-3">

                <input
                  type="radio"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />

                <span className="font-semibold">
                  Cash on Delivery
                </span>

              </div>

            </div>

          </div>


          {/* ORDER SUMMARY */}

          <div className="border rounded-lg p-6 h-fit">

            <h2 className="text-xl font-semibold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-3">
              <span>Amount</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Payment Method</span>
              <span>{paymentMethod}</span>
            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-lg mt-8 font-semibold"
            >
              {loading
                ? "Processing Demo Payment..."
                : `Pay ₹${totalAmount}`}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Demo payment only — no real transaction will occur.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Payment;