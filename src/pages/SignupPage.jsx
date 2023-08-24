import React, { useState } from "react";
import Input from "../components/Input";
import logo from "../assets/logo/Logo-hodu-l.svg";
import {
  Section,
  TypeChangeWrap,
  TypeChangeBtn,
  Form,
  Button,
  ErrorText,
} from "../pages/LoginPage";
import { Link } from "react-router-dom";

export default function SignupPage() {
  // const navigate = useNavigate();
  // const URL = "https://openmarket.weniv.co.kr";
  const [failMsg, setFailMsg] = useState("");
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    password2: "",
    phone_number: "",
    name: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
          구매회원가입
        </TypeChangeBtn>
        <TypeChangeBtn
          type="button"
          onClick={handleSellerLogin}
          className={userInfo.login_type === "SELLER" ? "" : "disabled"}
        >
          판매회원가입
        </TypeChangeBtn>
      </TypeChangeWrap>
      <Form onSubmit={handleSubmit}>
        <Input
          title="아이디"
          inputId="label-id"
          border="1px solid var(--color-maingrey)"
          borderRadius="5px"
          value={userInfo.username}
          name="username"
          onChange={handleInputChange}
        />
        <Input
          title="비밀번호"
          inputId="label-pw"
          border="1px solid var(--color-maingrey)"
          borderRadius="5px"
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleInputChange}
        />
        <Input
          title="비밀번호 재확인"
          inputId="label-pw"
          border="1px solid var(--color-maingrey)"
          borderRadius="5px"
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleInputChange}
        />
        <Input
          title="이름"
          inputId="label-name"
          border="1px solid var(--color-maingrey)"
          borderRadius="5px"
          value={userInfo.name}
          name="name"
          onChange={handleInputChange}
        />
        {failMsg && <ErrorText>{failMsg}</ErrorText>}
        <Button type="submit">로그인</Button>
      </Form>
    </Section>
  );
}
