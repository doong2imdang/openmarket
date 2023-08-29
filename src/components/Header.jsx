import React from "react";
import logo from "../assets/logo/Logo-hodu-s.svg";
import shoppingcart from "../assets/icon/icon-shopping-cart.svg";
import user from "../assets/icon/icon-user.svg";
import search from "../assets/icon/search.svg";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { loginState } from "../atom/loginAtom";

export default function Header() {
  const isLogin = useRecoilValue(loginState);

  return (
    <HeaderStyle>
      <Search>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <SearchInput
          border="2px solid var(--color-green)"
          borderRadius="50px"
          placeholder="상품을 검색해보세요!"
        />
        <button>
          <img src={search} alt="" />
        </button>
      </Search>
      <NavLinks>
        <Link to="/shoppingcartpage">
          <img src={shoppingcart} alt="" />
          <p>장바구니</p>
        </Link>
        <Link to={isLogin ? "/mypage" : "/loginpage"}>
          <img src={user} alt="" />
          <p>{isLogin ? "마이페이지" : "로그인"}</p>
        </Link>
      </NavLinks>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 22px 0;
  min-height: 90px;
`;

const SearchInput = styled(Input)`
  padding: 13px 60px 13px 24px;
  outline: none;
  margin-left: -25px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  button {
    position: absolute;
    right: 25px;
    top: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 27px;
  a {
    text-align: center;
  }

  p {
    font-size: 12px;
    color: var(--color-grey);
  }
`;
