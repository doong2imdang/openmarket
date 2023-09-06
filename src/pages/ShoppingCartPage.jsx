import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import checkbox from "../assets/icon/cart-check-box.svg";
import checkboxfill from "../assets/icon/cart-check-box-Fill.svg";

export default function ShoppingCartPage() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <Header />
      <Main>
        <h1>장바구니</h1>
        <UlStyle>
          <li>
            <img
              src={isChecked ? checkboxfill : checkbox}
              alt=""
              onClick={handleCheckboxClick}
            />
          </li>
          <li>상품정보</li>
          <li>수량</li>
          <li>상품금액</li>
        </UlStyle>
        <EmptyShoppingCart>
          <p>장바구니에 담긴 상품이 없습니다.</p>
          <span>원하는 상품을 장바구니에 담아보세요!</span>
        </EmptyShoppingCart>
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: 50px;

  h1 {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
  }
`;

const UlStyle = styled.ul`
  display: flex;
  justify-content: space-around;
  max-width: 1280px;
  margin: 52px auto 35px auto;
  padding: 20px 0;
  font-size: 18px;
  background-color: var(--color-lightgrey);
  border-radius: 10px;
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
