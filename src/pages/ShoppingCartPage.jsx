import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import checkbox from "../assets/icon/cart-check-box.svg";
import checkboxfill from "../assets/icon/cart-check-box-Fill.svg";
import { useRecoilValue } from "recoil";
import { userToken } from "../atom/loginAtom";
import { productImage } from "../atom/productAtom";

export default function ShoppingCartPage() {
  const URL = "https://openmarket.weniv.co.kr";
  const [isChecked, setIsChecked] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const authImage = useRecoilValue(productImage);
  console.log(authImage);

  const authToken = useRecoilValue(userToken);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  // console.log(authToken);

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
          <div>
            <img src={authImage} alt="" />
            {cartItems.map((item) => (
              <p>{item.quantity}</p>
            ))}
          </div>
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
