import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-20 px-5">
      <div className="max-w-6xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Contact Us
          </h1>

          <p className="mt-4 text-gray-500">
            We would love to hear from you. Get in touch with us!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* CONTACT INFORMATION */}
          <div className="border rounded-lg p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Get In Touch
            </h2>

            <div className="space-y-6">

              <div>
                <h3 className="font-semibold text-lg">
                  📍 Address
                </h3>
                <p className="text-gray-500 mt-1">
                  Eluru, Andhra Pradesh, India
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  📞 Phone
                </h3>
                <p className="text-gray-500 mt-1">
                  +91 9866191747
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  ✉️ Email
                </h3>
                <p className="text-gray-500 mt-1">
                  ecommerce@support.com
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  🕒 Working Hours
                </h3>
                <p className="text-gray-500 mt-1">
                  Monday - Saturday: 9:00 AM - 6:00 PM
                </p>
              </div>

            </div>

          </div>

          {/* CONTACT FORM */}
          <div className="border rounded-lg p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Send Us a Message
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent successfully!");
              }}
              className="space-y-5"
            >

              <div>
                <label className="block font-medium mb-2">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Message
                </label>

                <textarea
                  rows="5"
                  placeholder="Enter your message"
                  required
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;