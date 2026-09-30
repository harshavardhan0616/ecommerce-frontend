import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const user =
      JSON.parse(localStorage.getItem("user")) || null;

    if (!user || !user.id) {

      navigate("/signin");

      return;
    }

    fetch(`http://localhost:8081/orders/user/${user.id}`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        return response.json();
      })

      .then((data) => {

        setOrders(data);
        setLoading(false);
      })

      .catch((error) => {

        console.error(error);

        setError("Unable to load orders");

        setLoading(false);
      });

  }, [navigate]);


  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl">
          Loading your orders...
        </h2>
      </div>
    );
  }


  if (error) {

    return (
      <div className="text-center mt-20">

        <h2 className="text-red-500 text-xl">
          {error}
        </h2>

      </div>
    );
  }


  return (

    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-6xl mx-auto px-5">

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>


        {orders.length === 0 ? (

          <div className="bg-white p-10 text-center rounded-lg shadow">

            <h2 className="text-xl font-semibold mb-4">
              No orders yet
            </h2>

            <button
              onClick={() => navigate("/products")}
              className="bg-black text-white px-6 py-3 rounded"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((orderData) => {

              const order = orderData.order;
              const items = orderData.items || [];

              return (

                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow p-6"
                >

                  {/* ORDER HEADER */}

                  <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-4">

                    <div>

                      <h2 className="font-bold text-lg">
                        Order #{order.id}
                      </h2>

                      <p className="text-gray-500 text-sm">
                        Customer: {order.customerName}
                      </p>

                    </div>


                    <div className="mt-3 md:mt-0">

                      <p>
                        Status:

                        <span className="text-green-600 font-semibold ml-2">
                          {order.orderStatus}
                        </span>

                      </p>

                      <p>

                        Payment:

                        <span className="ml-2">
                          {order.paymentStatus}
                        </span>

                      </p>

                    </div>

                  </div>


                  {/* PRODUCTS */}

                  <div className="space-y-4">

                    {items.map((item) => (

                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row justify-between border-b pb-4"
                      >

                        <div>

                          <h3 className="font-semibold">
                            {item.productName}
                          </h3>

                          <p className="text-gray-600">
                            Size: {item.size || "N/A"}
                          </p>

                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>

                        </div>


                        <div className="mt-2 sm:mt-0">

                          <p className="font-semibold">
                            ₹{item.price}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>


                  {/* ORDER TOTAL */}

                  <div className="flex justify-between mt-5 text-lg font-bold">

                    <span>
                      Total Amount
                    </span>

                    <span>
                      ₹{order.totalAmount}
                    </span>

                  </div>


                  {/* DELIVERY ADDRESS */}

                  <div className="mt-5 border-t pt-4">

                    <h3 className="font-semibold mb-2">
                      Delivery Address
                    </h3>

                    <p className="text-gray-600">
                      {order.address}
                    </p>

                    <p className="text-gray-600">
                      {order.city}, {order.state} - {order.pincode}
                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );
};

export default MyOrders;