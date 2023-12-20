import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import MinusLine from "../assets/icon/icon-minus-line.svg";
import PlusLine from "../assets/icon/icon-plus-line.svg";
import Modal from "../components/Modal";
import { useRecoilValue } from "recoil";
import { userToken } from "../atom/loginAtom";

export default function ProductDetailPage() {
  const URL = "https://openmarket.weniv.co.kr";
  const { product_id } = useParams();
  const navigate = useNavigate();
  const authToken = useRecoilValue(userToken);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(product && product.stock <= 0 ? 0 : 1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(product && product.stock);
  console.log(count);

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
    if (product.stock > count) {
      setCount(count + 1);
    }
  };

  const handleMinusButton = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleBuyNow = () => {
    navigate("/buynow");
  };

  const totalPrcie = product && product.price ? product.price * count : 0;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = () => {
    if (product.stock > 0) {
      const requestData = {
        product_id: product_id,
        quantity: count,
        check: false,
      };

      fetch(`${URL}/cart/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("제품을 장바구니에 추가하는데 실패했습니다.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.check === false) {
            openModal();
          } else {
            console.log("제품이 장바구니에 성공적으로 추가되었습니다.");
          }
        })
        .catch((error) => {
          console.error("제품을 장바구니에 추가하는 중 오류발생");
        });
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
          <>
            <ProductDetailContainer>
              <ProductDetailImg>
                <img src={product.image} alt={product.product_name} />
              </ProductDetailImg>
              <ProductDetailDesc>
                <p>{product.store_name}</p>
                <h2>{product.product_name}</h2>
                {product.stock <= 0 ? (
                  <SoldOut>재입고 알림 SMS</SoldOut>
                ) : (
                  <span>
                    <strong>{product.price.toLocaleString()}</strong>원
                  </span>
                )}

                <p className="delivery">택배배송 / 무료배송</p>
                <ProductCount>
                  <button className="btn-minus" onClick={handleMinusButton}>
                    <img src={MinusLine} alt="" />
                  </button>
                  {product.stock <= 0 ? <p>0</p> : <p>{count}</p>}

                  <button className="btn-plus" onClick={handlePlusButton}>
                    <img src={PlusLine} alt="" />
                  </button>
                </ProductCount>
                <TotalPrice>
                  <p className="totalProductPrice">총 상품 금액</p>
                  {product.stock <= 0 ? (
                    <p className="totalCount">
                      총 수량 <strong>0</strong>개
                    </p>
                  ) : (
                    <p className="totalCount">
                      총 수량 <strong>{count}</strong>개
                    </p>
                  )}
                  <span>|</span>
                  {product.stock <= 0 ? (
                    <p className="totalPrice">
                      <strong>0</strong>원
                    </p>
                  ) : (
                    <p className="totalPrice">
                      <strong>{totalPrcie.toLocaleString()}</strong>원
                    </p>
                  )}
                </TotalPrice>
                <PurchaseOrCart>
                  <button className="btn-purchase" onClick={handleBuyNow}>
                    바로 구매
                  </button>

                  {product.stock <= 0 ? (
                    <button type="button" className="btn-soldout">
                      SOLD OUT
                    </button>
                  ) : (
                    <button className="btn-cart" onClick={addToCart}>
                      장바구니
                    </button>
                  )}
                  {isModalOpen && <Modal closeModal={closeModal} />}
                </PurchaseOrCart>
              </ProductDetailDesc>
            </ProductDetailContainer>
            <ProductInfo>
              <li>
                <button autoFocus type="button">
                  버튼
                </button>
              </li>
              <li>
                <button type="button">리뷰</button>
              </li>
              <li>
                <button type="button">Q&A</button>
              </li>
              <li>
                <button type="button">반품/교환정보</button>
              </li>
            </ProductInfo>
          </>
        ) : null}
      </div>
    </>
  );
}

const SoldOut = styled.button`
  border: 1px solid var(--color-grey);
  font-size: 20px;
  padding: 2px;
  border-radius: 5px;
`;

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

  .btn-soldout {
    background-color: black;
    width: 200px;
  }
`;

const ProductInfo = styled.ul`
  padding-bottom: 80px;
  display: flex;
  justify-content: center;

  li {
    display: block;
  }

  button {
    font-size: 18px;
    height: 130px;
    color: var(--color-grey);
    border-bottom: 6px solid #e0e0e0;
    padding: 80px 130px 20px 130px;
    outline: none;

    &:focus {
      border-bottom: 6px solid var(--color-green);
      color: var(--color-green);
    }
  }
`;
