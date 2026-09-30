import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // =========================
  // SAVE CART
  // =========================

  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =========================
  // INCREASE
  // =========================

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];

    updatedCart[index].quantity += 1;

    saveCart(updatedCart);
  };

  // =========================
  // DECREASE
  // =========================

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }

    saveCart(updatedCart);
  };

  // =========================
  // REMOVE
  // =========================

  const removeProduct = (index) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    saveCart(updatedCart);
  };

  // =========================
  // PRICE
  // =========================

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) * item.quantity,
    0
  );

  // =========================
  // DISCOUNT
  // =========================

  const totalDiscount = cart.reduce(
    (total, item) =>
      total +
      (Number(item.price) -
        Number(item.discountedPrice)) *
      item.quantity,
    0
  );

  // =========================
  // DISCOUNTED PRICE
  // =========================

  const discountedTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.discountedPrice) *
      item.quantity,
    0
  );

  // =========================
  // DELIVERY
  // =========================

  const deliveryCharges =
    discountedTotal >= 1000 || cart.length === 0
      ? 0
      : 50;

  // =========================
  // TOTAL
  // =========================

  const totalAmount =
    discountedTotal + deliveryCharges;

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-black text-white px-8 py-3 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-20">

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ========================= */}
        {/* CART PRODUCTS */}
        {/* ========================= */}

        <div className="lg:col-span-2 space-y-5">

          {cart.map((item, index) => (

            <div
              key={`${item.id}-${item.selectedSize}-${index}`}
              className="border rounded-lg p-5 flex gap-5"
            >

              {/* IMAGE */}

              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-32 h-40 object-cover rounded"
              />

              {/* DETAILS */}

              <div className="flex-1">

                <h2 className="text-xl font-semibold">
                  {item.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {item.brand}
                </p>

                <p className="mt-2">
                  Size:{" "}
                  <span className="font-semibold">
                    {item.selectedSize}
                  </span>
                </p>

                <div className="flex items-center gap-3 mt-3">

                  <span className="font-bold text-lg">
                    ₹{item.discountedPrice}
                  </span>

                  <span className="line-through text-gray-400">
                    ₹{item.price}
                  </span>

                  <span className="text-green-600">
                    {item.discountPersent}
                  </span>

                </div>

                {/* QUANTITY */}

                <div className="flex items-center gap-3 mt-5">

                  <button
                    onClick={() =>
                      decreaseQuantity(index)
                    }
                    className="border w-9 h-9 rounded text-xl"
                  >
                    −
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(index)
                    }
                    className="border w-9 h-9 rounded text-xl"
                  >
                    +
                  </button>

                </div>

                {/* REMOVE */}

                <button
                  onClick={() =>
                    removeProduct(index)
                  }
                  className="mt-4 text-red-600"
                >
                  🗑️ Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* ========================= */}
        {/* PRICE DETAILS */}
        {/* ========================= */}

        <div className="border rounded-lg p-6 h-fit">

          <h2 className="text-xl font-bold border-b pb-4">
            Price Details
          </h2>

          {/* PRICE */}

          <div className="flex justify-between mt-5">
            <span>Price</span>
            <span>
              ₹{totalPrice}
            </span>
          </div>

          {/* DISCOUNT */}

          <div className="flex justify-between mt-4 text-green-600">
            <span>Discount</span>
            <span>
              - ₹{totalDiscount}
            </span>
          </div>

          {/* DELIVERY */}

          <div className="flex justify-between mt-4">
            <span>Delivery Charges</span>

            <span>
              {deliveryCharges === 0
                ? "FREE"
                : `₹${deliveryCharges}`}
            </span>
          </div>

          {/* TOTAL */}

          <div className="flex justify-between border-t mt-5 pt-5 text-xl font-bold">

            <span>Total Amount</span>

            <span>
              ₹{totalAmount}
            </span>

          </div>

          {/* CHECKOUT */}

          <button
            onClick={() => {
              const isLoggedIn =
                localStorage.getItem("isLoggedIn") === "true";

              if (!isLoggedIn) {
                alert("Please sign in to checkout");
                navigate("/signin");
                return;
              }

              // User is logged in
              navigate("/checkout");
            }}
            className="w-full mt-6 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800"
          >
            Checkout
          </button>

        </div>

      </div>
    </div>
  );
};
export default Cart;