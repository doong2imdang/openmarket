import React, { useState } from "react";
import Input from "../components/Input";
import styled from "styled-components";
import logo from "../assets/logo/Logo-hodu-l.svg";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../atom/loginAtom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const URL = "https://openmarket.weniv.co.kr";
  const [failMsg, setFailMsg] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    login_type: "BUYER",
  });

  // console.log(userInfo);

  const handleBuyerLogin = () => {
    setUserInfo({
      ...userInfo,
      login_type: "BUYER",
    });
  };

  const handleSellerLogin = () => {
    setUserInfo({
      ...userInfo,
      login_type: "SELLER",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFailMsg("");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(URL + "/accounts/login/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...userInfo }),
      });
      const res = await response.json();
      console.log(res);

      if (response.ok) {
        setIsLogin(true);
        navigate("/");
      } else {
        setFailMsg("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(userInfo);
  };

  console.log(userInfo.username);
  console.log(userInfo.password);

  return (
    <Section>
      <h1>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </h1>
      <TypeChangeWrap>
        <h2 className="a11y-hidden">회원 종류 선택하기</h2>
        <TypeChangeBtn
          type="button"
          onClick={handleBuyerLogin}
          className={userInfo.login_type === "BUYER" ? "" : "disabled"}
        >
          구매회원 로그인
        </TypeChangeBtn>
        <TypeChangeBtn
          type="button"
          onClick={handleSellerLogin}
          className={userInfo.login_type === "SELLER" ? "" : "disabled"}
        >
          판매회원 로그인
        </TypeChangeBtn>
      </TypeChangeWrap>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="아이디"
          value={userInfo.username}
          name="username"
          onChange={handleInputChange}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={userInfo.password}
          name="password"
          onChange={handleInputChange}
        />
        {failMsg && <ErrorText>{failMsg}</ErrorText>}
        <Button
          type="submit"
          disabled={
            !userInfo.username ||
            !userInfo.password ||
            (failMsg && failMsg !== "")
          }
        >
          로그인
        </Button>
      </Form>
      <LinkWrap>
        <Link to="/signuppage">회원가입</Link>
        <span>|</span>
        <span>비밀번호 찾기</span>
      </LinkWrap>
    </Section>
  );
}

export const Section = styled.section`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    padding-bottom: 70px;
  }
`;

export const TypeChangeWrap = styled.div`
  display: flex;
  position: relative;
`;

export const TypeChangeBtn = styled.button`
  font-size: 18px;
  background-color: #ffffff;
  z-index: 100;
  width: 275px;
  height: 70px;
  border-top: 1px solid var(--color-maingrey);
  border-right: 1px solid var(--color-maingrey);
  border-left: 1px solid var(--color-maingrey);
  border-radius: 10px 10px 0 0;
  font-weight: bold;

  &.disabled {
    background-color: var(--color-lightgrey);
    border-bottom: 1px solid var(--color-maingrey);
  }
`;

export const Form = styled.form`
  width: 550px;
  padding: 54px 35px 36px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-maingrey);
  margin: -15px 0 30px;
  border-radius: 10px;
`;

export const Button = styled.button`
  width: 480px;
  color: #fff;
  font-size: 18px;
  background-color: ${(props) =>
    props.disabled ? "var(--color-maingrey)" : "var(--color-green)"};
  padding: 19px 0;
  border-radius: 5px;
  margin-top: 33px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const ErrorText = styled.p`
  color: var(--color-red);
  font-size: 16px;
  margin-top: 20px;
`;

export const LinkWrap = styled.div`
  display: flex;
  gap: 19px;
  a {
    color: var(--color-darkgrey);
    font-size: 16px;
  }
`;
