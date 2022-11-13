import React from "react";
import "./sass/style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import BrowsePage from "./components/Browse/BrowsePage";
import CategoryPage from "./components/Category/CategoryPage";
import CartPage from "./components/Cart/CartPage";
import DetailPage from "./components/Detail/DetailPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import Nav from "./components/Layout/Nav";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Nav />
          <Routes>
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/category/:type" element={<CategoryPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
