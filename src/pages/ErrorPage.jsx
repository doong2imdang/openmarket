import React from "react";
import styled from "styled-components";
import errorIcon from "../assets/icon/icon-404.svg";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <ErrorContainer>
      <img src={errorIcon} />
      <div>
        <h1>페이지를 찾을 수 없습니다.</h1>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. <br /> 웹 주소가
          올바른지 확인해 주세요.
        </p>
        <BtnContainer>
          <ErrorBtn
            type="button"
            green
            onClick={() => {
              navigate("/");
            }}
          >
            메인으로
          </ErrorBtn>
          <ErrorBtn
            type="button"
            borderLine
            onClick={() => {
              navigate(-1);
            }}
          >
            이전 페이지
          </ErrorBtn>
        </BtnContainer>
      </div>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 50px;

  h1 {
    font-weight: bold;
    font-size: 36px;
  }

  p {
    font-size: 16px;
    color: var(--color-grey);
    padding: 20px 0 40px 0;
    line-height: 20px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 14px;
`;

const ErrorBtn = styled.button`
  width: 200px;
  height: 60px;
  background-color: ${(props) => (props.green ? "var(--color-green)" : "#fff")};
  border: ${(props) =>
    props.borderLine ? "1px solid var(--color-maingrey)" : ""};
  border-radius: 5px;
  color: ${(props) => (props.green ? "#fff" : "var(--color-grey)")};
  font-weight: bold;
  font-size: 18px;
`;
