import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Carousel />
        <ProductList />
      </main>
      <Footer />
    </>
  );
}
