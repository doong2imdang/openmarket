import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import checkbox from "../assets/icon/cart-check-box.svg";
import checkboxfill from "../assets/icon/cart-check-box-Fill.svg";
import minusicon from "../assets/icon/icon-minus-line.svg";
import plusicon from "../assets/icon/icon-plus-line.svg";
import { useRecoilValue } from "recoil";
import { userToken } from "../atom/loginAtom";
import CartItem from "../components/CartItem";

export default function ShoppingCartPage() {
  const URL = "https://openmarket.weniv.co.kr";
  const [isChecked, setIsChecked] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const authToken = useRecoilValue(userToken);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  console.log(authToken);

  useEffect(() => {
    fetch(`${URL}/cart/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("장바구니를 불러오는데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        setCartItems(data.results);
      })
      .catch((error) => {
        console.error("장바구니 데이터를 불러오는 중 오류 발생");
      });
  }, []);

  return (
    <>
      <Header />
      <Main>
        <h1>장바구니</h1>
        <UlStyle>
          <li>
            <img
              src={isChecked ? checkboxfill : checkbox}
              alt="전체선택박스"
              onClick={handleCheckboxClick}
            />
          </li>
          <li>상품정보</li>
          <li>수량</li>
          <li>상품금액</li>
        </UlStyle>
        {cartItems.length === 0 ? (
          <EmptyShoppingCart>
            <p>장바구니에 담긴 상품이 없습니다.</p>
            <span>원하는 상품을 장바구니에 담아보세요!</span>
          </EmptyShoppingCart>
        ) : (
          <>
            <div>
              {cartItems.map((item) => (
                <CartItem
                  key={item.product_id}
                  item={item}
                  isChecked={isChecked}
                />
              ))}
            </div>
            <TotalPrice>
              <div>
                <p>총 상품금액</p>
                <strong>
                  46,500
                  <span>원</span>
                </strong>
              </div>
              <img src={minusicon} alt="" />
              <div>
                <p>상품 할인</p>
                <strong>
                  0<span>원</span>
                </strong>
              </div>
              <img src={plusicon} alt="" />
              <div>
                <p>배송비</p>
                <strong>
                  0<span>원</span>
                </strong>
              </div>
              <div className="expectedTotalPrice">
                <p>결제 예정 금액</p>
                <strong>
                  46,500<span>원</span>
                </strong>
              </div>
            </TotalPrice>
            <OrderBtn type="button">주문하기</OrderBtn>
          </>
        )}
      </Main>
    </>
  );
}

export const Main = styled.main`
  padding: 50px;

  h1 {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }
`;

export const UlStyle = styled.ul`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 1fr;
  max-width: 1280px;
  margin: 52px auto 35px auto;
  padding: 20px 0;
  font-size: 18px;
  background-color: var(--color-lightgrey);
  border-radius: 10px;
  li {
    text-align: center;
  }

  img {
    cursor: pointer;
  }
`;

const EmptyShoppingCart = styled.div`
  text-align: center;
  padding: 200px 0;
  p {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 18px;
  }

  span {
    font-size: 14px;
    color: var(--color-grey);
  }
`;

const TotalPrice = styled.div`
  padding: 30px 50px;
  width: 100%;
  max-width: 1280px;
  height: 150px;
  background-color: var(--color-lightgrey);
  display: grid;
  margin: 80px auto 40px auto;
  grid-template-columns: 1fr 0.5fr 1fr 0.5fr 1fr 1.5fr;
  border-radius: 10px;
  place-items: center;
  text-align: center;
  div {
    padding: 0 10px;

    p {
      margin-bottom: 8px;
    }

    p,
    span {
      font-size: 16px;
    }

    strong {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .expectedTotalPrice {
    p {
      font-weight: bold;
    }

    strong {
      color: var(--color-red);
      font-size: 36px;
      span {
        font-size: 18px;
      }
    }
  }

  img {
    display: block;
    margin: auto;
    background-color: #fff;
    padding: 5px;
    border-radius: 50px;
  }
`;

const OrderBtn = styled.button`
  display: block;
  color: #fff;
  background-color: var(--color-green);
  width: 220px;
  height: 68px;
  border-radius: 5px;
  margin: 0 auto;
`;
