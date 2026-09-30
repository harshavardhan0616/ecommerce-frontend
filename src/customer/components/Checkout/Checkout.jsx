import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const discountedTotal = cart.reduce(
    (total, item) =>
      total + Number(item.discountedPrice) * Number(item.quantity),
    0
  );

  const deliveryCharges =
    discountedTotal >= 1000 || cart.length === 0 ? 0 : 50;

  const totalAmount = discountedTotal + deliveryCharges;

  const [formData, setFormData] = useState({
    customerName: user.name || "",
    mobile: "",
    email: user.email || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const order = {
      userId: user.id,
      customerName: formData.customerName,
      mobile: formData.mobile,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      totalAmount: totalAmount,
    };

    const items = cart.map((item) => ({
      productId: Number(item.id),
      productName: item.title,
      quantity: Number(item.quantity),
      price: Number(item.discountedPrice),
      size: item.selectedSize || "",
    }));

    console.log("ORDER:", order);
    console.log("ORDER ITEMS:", items);

    navigate("/payment", {
      state: {
        totalAmount: totalAmount,
        orderData: {
          order: order,
          items: items,
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow">

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        <form onSubmit={handleContinueToPayment}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* CUSTOMER DETAILS */}

            <div>

              <h2 className="text-xl font-semibold mb-5">
                Delivery Details
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  name="customerName"
                  placeholder="Full Name"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded"
                />

                <input
                  type="text"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded"
                />

                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border p-3 rounded"
                />

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded"
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded"
                />

                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full border p-3 rounded"
                />

              </div>

            </div>


            {/* ORDER SUMMARY */}

            <div>

              <h2 className="text-xl font-semibold mb-5">
                Order Summary
              </h2>

              <div className="border rounded-lg p-5">

                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      {item.selectedSize && (
                        <p className="text-sm text-gray-500">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>

                    <p>
                      ₹
                      {Number(item.discountedPrice) *
                        Number(item.quantity)}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between mt-5">
                  <span>Subtotal</span>
                  <span>₹{discountedTotal}</span>
                </div>

                <div className="flex justify-between mt-3">
                  <span>Delivery</span>
                  <span>
                    {deliveryCharges === 0
                      ? "FREE"
                      : `₹${deliveryCharges}`}
                  </span>
                </div>

                <hr className="my-5" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-lg mt-6 font-semibold"
                >
                  Continue to Payment
                </button>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Checkout;