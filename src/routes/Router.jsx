import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import MyPage from "../pages/MyPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/signuppage" element={<SignupPage />} />
      <Route path="/shoppingcartpage" element={<ShoppingCartPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}
