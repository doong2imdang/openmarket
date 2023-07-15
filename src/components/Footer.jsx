import React from "react";
import styled from "styled-components";
import insta from "../assets/icon/insta.svg";
import facebook from "../assets/icon/facebook.svg";
import youtube from "../assets/icon/youtube.svg";

export default function Footer() {
  return (
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
    </UlContainer>
  );
}

const UlContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1400px;
    height: 1px;
    background-color: black;
  }
`;

const UlList = styled.ul`
  display: flex;
  gap: 15px;
  padding: 50px 0;

  li,
  span {
    font-size: 14px;
  }
`;

const UlSns = styled.ul`
  display: flex;
  gap: 14px;
  padding: 50px 0;

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
