import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import MinusLine from "../assets/icon/icon-minus-line.svg";
import PlusLine from "../assets/icon/icon-plus-line.svg";

export default function ProductDetailPage() {
  const URL = "https://openmarket.weniv.co.kr";
  const { product_id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (product_id) {
      fetch(`${URL}/products/${product_id}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("찾을 수 없습니다.");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setProduct(data);
          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setProduct(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("상품 ID가 제공되지 않았습니다.");
      setLoading(false);
    }
  }, [product_id]);

  const handlePlusButton = () => {
    setCount(count + 1);
  };

  const handleMinusButton = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : product ? (
          <ProductDetailContainer>
            <ProductDetailImg>
              <img src={product.image} alt={product.product_name} />
            </ProductDetailImg>
            <ProductDetailDesc>
              <p>{product.store_name}</p>
              <h2>{product.product_name}</h2>
              <span>
                <strong>{product.price.toLocaleString()}</strong>원
              </span>
              <p className="delivery">택배배송 / 무료배송</p>
              <ProductCount>
                <button className="btn-minus" onClick={handleMinusButton}>
                  <img src={MinusLine} alt="" />
                </button>
                <p>{count}</p>
                <button className="btn-plus" onClick={handlePlusButton}>
                  <img src={PlusLine} alt="" />
                </button>
              </ProductCount>
              <TotalPrice>
                <p>총 상품 금액</p>
                <p>총 수량 1개</p>
                <span>|</span>
                <p>
                  <strong>17500</strong>원
                </p>
              </TotalPrice>
              <PurchaseOrCart>
                <button>바로 구매</button>
                <button>장바구니</button>
              </PurchaseOrCart>
            </ProductDetailDesc>
          </ProductDetailContainer>
        ) : null}
      </div>
    </>
  );
}

const ProductDetailContainer = styled.div`
  padding: 75px 0;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const ProductDetailImg = styled.div`
  img {
    width: 600px;
    height: 600px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

const ProductDetailDesc = styled.div`
  position: relative;
  p {
    font-size: 18px;
    color: var(--color-grey);
  }

  h2 {
    font-size: 36px;
    padding: 15px 0 20px 0;
  }

  span {
    font-size: 18px;
    strong {
      font-size: 36px;
      font-weight: bold;
    }
  }

  .delivery {
    padding-top: 140px;
  }
`;

const ProductCount = styled.div`
  display: flex;
  align-items: center;
  margin: 55px 0 70px 0;
  button {
    width: 60px;
    height: 60px;

    ::before {
      content: "";
      position: absolute;
      min-width: 630px;
      height: 2px;
      background-color: var(--color-maingrey);
      left: 0;
      top: 310px;
    }

    ::after {
      content: "";
      position: absolute;
      min-width: 630px;
      height: 2px;
      background-color: var(--color-maingrey);
      left: 0;
      top: 425px;
    }
  }

  .btn-minus {
    border: 1px solid var(--color-maingrey);
    border-radius: 5px 0 0 5px;
  }

  .btn-plus {
    border: 1px solid var(--color-maingrey);
    border-radius: 0 5px 5px 0;
  }

  p {
    width: 60px;
    height: 60px;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    color: inherit;
    border-top: 1px solid var(--color-maingrey);
    border-bottom: 1px solid var(--color-maingrey);
  }
`;

const TotalPrice = styled.div`
  display: flex;
`;

const PurchaseOrCart = styled.div``;
