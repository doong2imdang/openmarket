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
            <button>
              <img src={product.image} alt="판매상품" />
            </button>
            <p>{product.store_name}</p>
            <span>{product.product_name}</span>
            <strong>{product.price.toLocaleString()}원</strong>
          </li>
        ))}
      </UlStyle>
    </>
  );
}

const UlStyle = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 70px;
  justify-content: center;
  padding: 50px 100px 130px 100px;

  li {
    display: flex;
    flex-direction: column;

    img {
      max-width: 380px;
      border: 1px solid var(--color-lightgrey);
      border-radius: 10px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    p {
      font-size: 22px;
      color: var(--color-grey);
      padding: 18px 0;
    }

    span {
      font-size: 22px;
      padding-bottom: 18px;
      cursor: pointer;
    }

    strong {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;
