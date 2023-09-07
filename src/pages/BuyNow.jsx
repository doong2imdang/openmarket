import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { Main, UlStyle } from "./ShoppingCartPage";

export default function BuyNow() {
  return (
    <>
      <Header />
      <Main>
        <h1>주문/결제하기</h1>
        <UlStylePlus>
          <li>상품정보</li>
          <li>할인</li>
          <li>배송비</li>
          <li>주문금액</li>
        </UlStylePlus>
      </Main>
    </>
  );
}

const UlStylePlus = styled(UlStyle)`
  grid-template-columns: 2.5fr 1fr 1fr 1fr;
`;
