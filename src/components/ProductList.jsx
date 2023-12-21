import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
            <Link to={`/products/${product.product_id}`}>
              <img src={product.image} alt="판매상품" />
            </Link>
            <p>{product.store_name}</p>
            <Link to={`/products/${product.product_id}`}>
              <span>{product.product_name}</span>
            </Link>

            {product.stock <= 0 ? (
              <SoldOutSign>SOLD OUT</SoldOutSign>
            ) : (
              <strong>{product.price.toLocaleString()}원</strong>
            )}
          </li>
        ))}
      </UlStyle>
    </>
  );
}

export const SoldOutSign = styled.strong`
  background-color: black;
  color: #fff;
  width: 150px;
  padding: 5px;
  text-align: center;
`;

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
      width: 380px;
      height: 380px;
      border: 1px solid var(--color-lightgrey);
      border-radius: 10px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    p {
      font-size: 22px;
      color: var(--color-grey);
      padding: 18px 0;
    }

    a:nth-child(3) {
      padding-bottom: 18px;
      span {
        font-size: 22px;
        cursor: pointer;
      }
    }

    strong {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;
