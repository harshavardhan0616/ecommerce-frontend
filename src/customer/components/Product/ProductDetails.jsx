import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  const [selectedSize, setSelectedSize] = useState("");


  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return (
      <div className="text-center py-20">

        <h2 className="text-2xl font-bold">
          Product not found
        </h2>

      </div>
    );
  }


  // =========================
  // CREATE UNIQUE PRODUCT KEY
  // =========================

  const productKey =
    product.id ||
    product._id ||
    `${product.imageUrl}-${product.title}-${product.brand}`;


  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {

    // Size must be selected
    if (!selectedSize) {

      alert("Please select a size");

      return;
    }


    // Get existing cart
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];


    // =========================
    // CHECK SAME PRODUCT + SAME SIZE
    // =========================

    const existingIndex = existingCart.findIndex(
      (item) =>
        item.productKey === productKey &&
        item.selectedSize === selectedSize
    );


    let updatedCart;


    // =========================
    // SAME PRODUCT + SAME SIZE
    // =========================

    if (existingIndex !== -1) {

      updatedCart = [...existingCart];

      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],

        quantity:
          Number(updatedCart[existingIndex].quantity || 0) + 1,
      };

    }


    // =========================
    // DIFFERENT PRODUCT
    // OR DIFFERENT SIZE
    // =========================

    else {

      const cartItem = {

        ...product,

        // IMPORTANT
        productKey: productKey,

        // Selected size
        selectedSize: selectedSize,

        // Start quantity
        quantity: 1,
      };


      updatedCart = [
        ...existingCart,
        cartItem,
      ];

    }


    // =========================
    // SAVE CART
    // =========================

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );


    // Go to cart
    navigate("/cart");
  };


  // =========================
  // SIZES
  // =========================

  const sizes =
    product.size?.map((item) => item.name) || [
      "S",
      "M",
      "L",
    ];


  // =========================
  // PAGE
  // =========================

  return (

    <div className="max-w-6xl mx-auto px-6 py-20">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">


        {/* ========================= */}
        {/* IMAGE */}
        {/* ========================= */}

        <div className="flex justify-center">

          {/* <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-w-md h-[500px] object-cover rounded-lg"
          /> */}
          <div>
            {/* <p className="mb-2">Image URL:</p> */}

            {/* <p className="text-sm break-all mb-4">
              {product.imageUrl}
            </p> */}

            <img
              src={product.imageUrl}
              alt={product.title}
               className="w-full max-w-md h-[500px] object-cover rounded-lg"
            />
          </div>

        </div>


        {/* ========================= */}
        {/* DETAILS */}
        {/* ========================= */}

        <div className="py-5">


          {/* BRAND */}

          <p className="text-gray-500 text-lg">
            {product.brand}
          </p>


          {/* TITLE */}

          <h1 className="text-3xl font-bold mt-2">
            {product.title}
          </h1>


          {/* ========================= */}
          {/* PRICE */}
          {/* ========================= */}

          <div className="flex items-center gap-4 mt-6">

            <span className="text-2xl font-bold">
              ₹{product.discountedPrice}
            </span>

            <span className="text-xl line-through text-gray-400">
              ₹{product.price}
            </span>

            <span className="text-lg text-green-600 font-semibold">
              {product.discountPersent}
            </span>

          </div>


          {/* ========================= */}
          {/* SIZE */}
          {/* ========================= */}

          <div className="mt-8">

            <h2 className="font-semibold text-lg mb-4">
              Select Size
            </h2>


            <div className="flex gap-3">

              {sizes.map((size) => (

                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`border px-6 py-3 rounded ${selectedSize === size
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    }`}
                >
                  {size}
                </button>

              ))}

            </div>

          </div>


          {/* ========================= */}
          {/* ADD TO CART */}
          {/* ========================= */}

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-10 w-full bg-black text-white py-4 rounded-lg text-lg font-semibold hover:bg-gray-800"
          >
            Add to Cart
          </button>


        </div>

      </div>

    </div>

  );
};

export default ProductDetails;