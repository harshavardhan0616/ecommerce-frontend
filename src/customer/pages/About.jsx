import React from "react";

const About = () => {
return ( <div className="bg-gray-50 min-h-screen">
  {/* Hero Section */}
  <div className="bg-black text-white py-20 px-6 text-center">
    <h1 className="text-5xl font-bold">
      About Us
    </h1>

    <p className="mt-4 text-lg max-w-3xl mx-auto">
      We bring fashion, style, and convenience together by offering
      quality products at affordable prices.
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-6 py-16">

    {/* Our Story */}
    <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

      <div>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
          alt="Online fashion store"
          className="w-full h-80 object-cover rounded-lg shadow"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-4">
          Our Story
        </h2>

        <p className="text-gray-600 leading-7">
          Our e-commerce platform was created with the goal of making
          online shopping simple, secure, and enjoyable.
          From trendy clothing to stylish footwear and accessories,
          we provide products for different styles and needs.
        </p>

        <p className="text-gray-600 leading-7 mt-4">
          We focus on providing a smooth shopping experience,
          from browsing products to adding items to the cart
          and completing your purchase.
        </p>
      </div>

    </div>

    {/* Why Choose Us */}
    <div className="mb-16">

      <h2 className="text-3xl font-bold text-center mb-10">
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-4xl">👕</div>

          <h3 className="font-semibold text-lg mt-4">
            Latest Fashion
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Discover trendy clothing and the latest styles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-4xl">🚚</div>

          <h3 className="font-semibold text-lg mt-4">
            Fast Delivery
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Get your orders delivered quickly and safely.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-4xl">🔒</div>

          <h3 className="font-semibold text-lg mt-4">
            Secure Shopping
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Shop with confidence using secure services.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <div className="text-4xl">💬</div>

          <h3 className="font-semibold text-lg mt-4">
            Customer Support
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            We are here to help whenever you need us.
          </p>
        </div>

      </div>

    </div>

    {/* Statistics */}
    <div className="bg-white rounded-xl shadow p-8 mb-16">

      <h2 className="text-3xl font-bold text-center mb-8">
        Our Achievements
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

        <div>
          <h3 className="text-3xl font-bold text-indigo-600">
            10K+
          </h3>
          <p className="text-gray-500">
            Happy Customers
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-indigo-600">
            5K+
          </h3>
          <p className="text-gray-500">
            Products
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-indigo-600">
            100+
          </h3>
          <p className="text-gray-500">
            Brands
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-indigo-600">
            24/7
          </h3>
          <p className="text-gray-500">
            Support
          </p>
        </div>

      </div>

    </div>

    {/* Mission */}
    <div className="text-center max-w-3xl mx-auto">

      <h2 className="text-3xl font-bold mb-4">
        Our Mission
      </h2>

      <p className="text-gray-600 leading-7">
        Our mission is to make online shopping simple and convenient
        by providing quality products, affordable prices, and a smooth
        shopping experience for every customer.
      </p>

    </div>

  </div>

</div>

);
};

export default About;
