import "./App.css";

import Navigation from "./customer/components/Navigation/Navigation.jsx";
import HomePage from "./customer/pages/HomePage/HomePage";
import Footer from "./customer/components/Footer/Footer";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/Product/ProductDetails";
import Cart from "./customer/pages/HomePage/Cart/Cart";
import Login from "./customer/pages/Login";
import Register from "./customer/pages/Register";
import { AuthProvider } from "./Auth";
import Contact from "./customer/pages/Contact";
import About from "./customer/pages/About";
import Checkout from "./customer/components/Checkout/Checkout";
import MyOrders from "./customer/components/MyOrders/MyOrders";
import Payment from "./customer/components/Payment/Payment";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <div>

          <Navigation />

          <Routes>

            {/* LOGIN */}
            <Route
              path="/signin"
              element={<Login />}
            />

            {/* REGISTER */}
            <Route
              path="/register"
              element={<Register />}
            />

            {/* CONTACT */}
            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* ABOUT */}
            <Route
              path="/about"
              element={<About />}
            />

            {/* HOME */}
            <Route
              path="/"
              element={<HomePage />}
            />

            {/* PRODUCTS */}
            <Route
              path="/products"
              element={<Product />}
            />
            <Route 
              path="/my-orders" 
              element={<MyOrders />} 
              />
            <Route 
              path="/payment" 
              element={<Payment />} 
            />
            {/* CATEGORY PRODUCTS */}
            <Route
              path="/products/:category"
              element={<Product />}
            />

            {/* PRODUCT DETAILS */}
            <Route
              path="/product-details"
              element={<ProductDetails />}
            />

            {/* CART */}
            <Route
              path="/cart"
              element={<Cart />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />

          </Routes>

          <Footer />

        </div>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;