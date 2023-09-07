import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import MyPage from "../pages/MyPage";
import BuyNow from "../pages/BuyNow";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/signuppage" element={<SignupPage />} />
      <Route path="/shoppingcartpage" element={<ShoppingCartPage />} />
      <Route path="/products/:product_id" element={<ProductDetailPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/buynow" element={<BuyNow />} />
    </Routes>
  );
}
