import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
      <UlStyle>
        {products.map((product) => (
          <li key={product.product_id}>
            <img src={product.image} alt="판매상품" />
            <span>{product.store_name}</span>
            <span>{product.product_name}</span>
            <span>{product.price}</span>
          </li>
        ))}
      </UlStyle>
    </>
  );
}

const UlStyle = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;

  li {
    display: flex;
    flex-direction: column;
  }
  img {
    max-width: 360px;
  }
`;
