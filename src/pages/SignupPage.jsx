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
import styled from "styled-components";
import IconCheckOff from "../assets/icon/icon-check-off.svg";
// import IconCheckOn from "../assets/icon/icon-check-on.svg";
import IconCheckBox from "../assets/icon/icon-check-box.svg";
import IconCheck from "../assets/icon/icon-check-fill.svg";

export default function SignupPage() {
  // const navigate = useNavigate();
  // const URL = "https://openmarket.weniv.co.kr";
  const [failMsg, setFailMsg] = useState("");
  const [checked, setChecked] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    password2: "",
    phone_number: "",
    name: "",
    login_type: "BUYER",
  });

  console.log(userInfo);

  const handleCheckBoxClick = () => {
    setChecked(!checked);
  };

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

    const phoneNumber = `${userInfo.phone_number1}-${userInfo.phone_number2}-${userInfo.phone_number3}`;
    setUserInfo((prevState) => ({
      ...prevState,
      phone_number: phoneNumber,
    }));

    setFailMsg("");
  };

  // const handleSignup = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <SectionStyle>
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
        <IdContainer>
          <Input
            title="아이디"
            inputId="label-id"
            border="1px solid var(--color-maingrey)"
            borderRadius="5px"
            value={userInfo.username}
            name="username"
            onChange={handleInputChange}
          />
          <button>중복확인</button>
        </IdContainer>
        <InputWithIcon
          title="비밀번호"
          inputId="label-pw"
          border="1px solid var(--color-maingrey)"
          borderRadius="5px"
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleInputChange}
          icon={IconCheckOff}
        />
        <InputWithIcon
          title="비밀번호 재확인"
          inputId="label-pw2"
          border="1px solid var(--color-maingrey)"
          borderRadius="5px"
          type="password"
          value={userInfo.password2}
          name="password2"
          onChange={handleInputChange}
          icon={IconCheckOff}
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
        <TelContainer>
          <label htmlFor="label-tel1">휴대폰번호</label>
          <select
            id="label-tel1"
            value={userInfo.phone_number1}
            name="phone_number1"
            onChange={handleInputChange}
          >
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
          </select>
          <input
            type="tel"
            id="label-tel2"
            value={userInfo.phone_number2}
            name="phone_number2"
            onChange={handleInputChange}
            maxLength="4"
          />
          <input
            type="tel"
            id="label-tel3"
            value={userInfo.phone_number3}
            name="phone_number3"
            onChange={handleInputChange}
            maxLength="4"
          />
        </TelContainer>
        {failMsg && <ErrorText>{failMsg}</ErrorText>}
      </Form>
      <CheckBoxContainer>
        <button onClick={handleCheckBoxClick}>
          <img src={checked ? IconCheck : IconCheckBox} alt="체크박스" />
        </button>
        <p>
          호두샵의 <strong>이용약관</strong> 및{" "}
          <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.
        </p>
      </CheckBoxContainer>
      <Button type="submit" className="btn-signup">
        가입하기
      </Button>
    </SectionStyle>
  );
}

const SectionStyle = styled(Section)`
  h1 {
    margin-top: -25px;
  }
  p {
    color: var(--color-grey);
    width: 510px;
    line-height: 20px;
    strong {
      font-weight: bold;
      text-decoration: underline;
    }
  }

  input {
    padding-left: 10px;
    padding-right: 10px;
  }

  input:focus {
    outline: 1px solid var(--color-green);
  }

  .btn-signup {
    margin-top: 0;
  }
`;

const IdContainer = styled.div`
  label {
    width: 550px;
  }

  input {
    width: 346px;
  }

  display: flex;
  align-items: top;
  flex-wrap: wrap;
  justify-content: space-between;

  button {
    width: 122px;
    height: 60px;
    background: var(--color-green);
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
  }
`;

const InputWithIcon = styled(Input)`
  position: relative;
  padding-right: 50px;

  ::before {
    content: "";
    position: absolute;
    right: 15px;
    bottom: -170%;
    transform: translateY(100%);
    background: url(${(props) => props.icon}) no-repeat center;
    width: 28px;
    height: 28px;
  }

  &:nth-child(5) {
    margin-bottom: 50px;
  }
`;

const TelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  label {
    color: var(--color-grey);
    font-size: 16px;
    margin: 6px 0 12px 0;
    width: 550px;
  }
  input,
  select {
    border: 1px solid var(--color-maingrey);
    border-radius: 5px;
    padding: 20px 10px;
    font-size: 16px;
    width: 151px;

    &:focus {
      outline: 1px solid var(--color-green);
    }
  }

  #label-tel1 {
    text-align: center;
  }

  #label-tel1,
  #label-tel2 {
    margin-right: 12px;
  }
`;

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 10px;
`;
