import React, { useState, useEffect } from "react";

export default function ProductList() {
  const URL = "https://openmarket.weniv.co.kr";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        const response = await fetch(URL + "/products");
        if (!response.ok) {
          throw new Error("HTTP error!");
        }
        const data = await response.json();
        setProducts(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    handleGetProducts();
  }, []);

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <img src={product.image} alt="판매상품" />
            <span>{product.price}</span>
            {product.product_name}
          </li>
        ))}
      </ul>
    </>
  );
}
