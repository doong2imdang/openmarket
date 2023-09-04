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

  const totalPrcie = product && product.price ? product.price * count : 0;

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : product ? (
          <>
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
                  <p className="totalProductPrice">총 상품 금액</p>
                  <p className="totalCount">
                    총 수량 <strong>{count}</strong>개
                  </p>
                  <span>|</span>
                  <p className="totalPrice">
                    <strong>{totalPrcie.toLocaleString()}</strong>원
                  </p>
                </TotalPrice>
                <PurchaseOrCart>
                  <button className="btn-purchase">바로 구매</button>
                  <button className="btn-cart">장바구니</button>
                </PurchaseOrCart>
              </ProductDetailDesc>
            </ProductDetailContainer>
            <ProductInfo>
              <button>버튼</button>
              <button>리뷰</button>
              <button>Q&A</button>
              <button>반품/교환정보</button>
            </ProductInfo>
          </>
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
  gap: 15px;
  margin-bottom: 35px;
  align-items: center;
  .totalProductPrice {
    padding-right: 250px;
    font-size: 18px;
    font-weight: bold;
  }

  .totalCount {
    font-size: 18px;
    strong {
      color: var(--color-green);
      font-weight: bold;
    }
  }

  span {
    color: var(--color-maingrey);
  }

  .totalPrice {
    color: var(--color-green);
    font-size: 18px;
    strong {
      font-size: 36px;
      font-weight: bold;
    }
  }
`;

const PurchaseOrCart = styled.div`
  display: flex;
  gap: 16px;
  button {
    font-size: 18px;
    height: 60px;
    color: #ffffff;
    border-radius: 5px;
  }

  .btn-purchase {
    background-color: var(--color-green);
    width: 416px;
  }

  .btn-cart {
    background-color: var(--color-grey);
    width: 200px;
  }
`;

const ProductInfo = styled.div`
  padding-bottom: 80px;
  display: flex;
  justify-content: center;
  button {
    font-size: 18px;
    color: var(--color-grey);
    border-bottom: 6px solid #e0e0e0;
    padding: 80px 130px 20px 130px;

    &:focus {
      border-bottom: 6px solid var(--color-green);
      color: var(--color-green);
    }
  }
`;
