import React from "react";
import styled from "styled-components";
import btndelete from "../assets/icon/icon-delete.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isProductInCartState } from "../atom/modalAtom";

export default function Modal({ closeModal }) {
  const navigate = useNavigate();
  const isProductInCart = useRecoilValue(isProductInCartState);

  console.log("모달", isProductInCart);
  return (
    <ModalStyle>
      <div className="modal">
        {isProductInCart ? (
          <p>
            이미 장바구니에 있는 상품입니다. <br />
            장바구니로 이동하시겠습니까?
          </p>
        ) : (
          <p>
            선택하신 상품을
            <br />
            담았습니다.
          </p>
        )}

        <div>
          {isProductInCart ? (
            <button type="button" className="btn-left" onClick={closeModal}>
              아니오
            </button>
          ) : (
            <button type="button" className="btn-left" onClick={closeModal}>
              계속 쇼핑
            </button>
          )}

          {isProductInCart ? (
            <button
              type="button"
              className="btn-right"
              onClick={() => navigate("/shoppingcartpage")}
            >
              예
            </button>
          ) : (
            <button
              type="button"
              className="btn-right"
              onClick={() => navigate("/shoppingcartpage")}
            >
              장바구니
            </button>
          )}
        </div>
        <button type="button" className="btn-delete" onClick={closeModal}>
          <img src={btndelete} alt="닫기버튼" />
        </button>
      </div>
    </ModalStyle>
  );
}

const ModalStyle = styled.article`
  padding: 50px 0 40px 0;
  position: absolute;
  background-color: #ffffff;
  transform: translate(-50%, -100%);
  .modal {
    position: relative;
  }

  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 25px;
  border: 2px solid var(--color-maingrey);

  .btn-left,
  .btn-right {
    border-radius: 5px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    margin-top: 32px;
  }

  .btn-left {
    border: 1px solid var(--color-maingrey);
    color: var(--color-grey);
    margin-right: 10px;
  }

  .btn-right {
    color: #ffffff;
    background-color: var(--color-green);
  }

  .btn-delete {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 0;
    right: 0;
    transform: translate(25px, -38px);
  }
`;
