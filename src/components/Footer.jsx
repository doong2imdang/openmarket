import React from "react";
import styled from "styled-components";
import insta from "../assets/icon/insta.svg";
import facebook from "../assets/icon/facebook.svg";
import youtube from "../assets/icon/youtube.svg";

export default function Footer() {
  return (
    <>
      <UlContainer>
        <UlList>
          <li>호두샵 소개</li>
          <span>|</span>
          <li>이용약관</li>
          <span>|</span>
          <li>개인정보처리방침</li>
          <span>|</span>
          <li>전자금융거래약관</li>
          <span>|</span>
          <li>청소년보호정책</li>
          <span>|</span>
          <li>제휴문의</li>
        </UlList>
        <UlSns>
          <li>
            <button>
              <img src={insta} alt="" />
            </button>
          </li>
          <li>
            <button>
              <img src={facebook} alt="" />
            </button>
          </li>
          <li>
            <button>
              <img src={youtube} alt="" />
            </button>
          </li>
        </UlSns>
        <UlInfo>
          <li>
            <strong>(주)HODU SHOP</strong>
          </li>
          <li>
            <p>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</p>
          </li>
          <li>
            <p>사업자 번호: 000-0000-0000 | 통신판매업</p>
          </li>
          <li>
            <p>대표: 김호두</p>
          </li>
        </UlInfo>
      </UlContainer>
    </>
  );
}

const UlContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  position: relative;
  padding: 0 50px;

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1400px;
    height: 1px;
    background-color: var(--color-maingrey);
  }
`;

const UlList = styled.ul`
  grid-row: 1;
  display: flex;
  gap: 15px;
  padding: 50px 35px;

  li,
  span {
    font-size: 14px;
  }
`;

const UlSns = styled.ul`
  grid-row: 1;
  display: flex;
  gap: 14px;
  padding: 50px 35px;

  li {
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-grey);
      padding: 8px;
      border-radius: 50px;
    }
  }

  li:nth-child(2) {
    button {
      padding: 8px 13px;
    }
  }
`;

const UlInfo = styled.ul`
  grid-row: 2;
  display: flex;
  flex-direction: column;
  padding: 0 35px;

  li {
    font-size: 14px;
    color: var(--color-grey);
    line-height: 24px;
    strong {
      font-weight: bold;
    }
  }
`;
