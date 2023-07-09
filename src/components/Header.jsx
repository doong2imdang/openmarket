import React from "react";
import logo from "../assets/logo/Logo-hodu-s.svg";
import shoppingcart from "../assets/icon/icon-shopping-cart.svg";
import user from "../assets/icon/icon-user.svg";
import search from "../assets/icon/search.svg";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import styled from "styled-components";

export default function Header() {
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
        <Link to="/mypage">
          <img src={user} alt="" />
          <p>마이페이지</p>
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
`;

const SearchInput = styled(Input)`
  padding-left: 24px;
  outline: none;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  button {
    position: absolute;
    right: 25px;
    top: 15px;
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
