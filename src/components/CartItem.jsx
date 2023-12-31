import React, { useState, useEffect } from "react";
import styled from "styled-components";
import checkbox from "../assets/icon/cart-check-box.svg";
import checkboxfill from "../assets/icon/cart-check-box-Fill.svg";
import MinusLine from "../assets/icon/icon-minus-line.svg";
import PlusLine from "../assets/icon/icon-plus-line.svg";
import DeleteBtn from "../assets/icon/icon-delete.svg";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { userToken } from "../atom/loginAtom";

export default function CardItem({ item, isChecked }) {
  const authToken = useRecoilValue(userToken);
  const URL = "https://openmarket.weniv.co.kr";
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [isCheckedBox, setIsCheckedBox] = useState(isChecked);
  const [count, setCount] = useState(item.quantity);

  const handleCheckboxClick = () => {
    setIsCheckedBox(!isCheckedBox);
  };

  const handlePlusButton = () => {
    setCount(count + 1);
    updateCartItem(item.cart_item_id, count + 1, item.is_active);
  };

  const handleMinusButton = () => {
    if (count > 1) {
      setCount(count - 1);
      updateCartItem(item.cart_item_id, count - 1, item.is_active);
    }
  };

  // 장바구니 상품 개별 삭제하기
  const handleDeleteItem = async () => {
    try {
      const response = await fetch(`${URL}/cart/${item.cart_item_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete each items from the cart.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // 장바구니 수량 수정하기
  const updateCartItem = async (quantity, isActive) => {
    try {
      const response = await fetch(`${URL}/cart/${item.cart_item_id}`, {
        method: "PUT",
        headers: {
          Authorization: `JWT ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: item.product_id,
          quantity: quantity,
          is_active: isActive,
        }),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  useEffect(() => {
    setIsCheckedBox(isChecked);
  }, [isChecked]);

  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        const response = await fetch(URL + "/products");
        if (!response.ok) {
          throw new Error("HTTP error!");
        }
        const data = await response.json();
        setProducts(data.results);

        const matchingProduct = data.results.find(
          (product) => product.product_id === item.product_id
        );

        if (matchingProduct) {
          setProductInfo({
            image: matchingProduct.image,
            storeName: matchingProduct.store_name,
            productName: matchingProduct.product_name,
            productPrice: matchingProduct.price,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleGetProducts();
  }, [item.product_id, products]);

  const formattedPrice = productInfo.productPrice
    ? productInfo.productPrice.toLocaleString()
    : "";

  const totalPrice = productInfo.productPrice
    ? (productInfo.productPrice * item.quantity).toLocaleString()
    : "";

  return (
    <>
      {productInfo && (
        <CartContainer>
          <CheckBox>
            <img
              src={isCheckedBox ? checkboxfill : checkbox}
              alt="전체선택박스"
              onClick={handleCheckboxClick}
            />
          </CheckBox>
          <ProductInfo className="product-info">
            <ProductImage to={`/products/${item.product_id}`}>
              <img src={productInfo.image} alt="" />
            </ProductImage>
            <ProductDesc>
              <p className="storename">{productInfo.storeName}</p>
              <Link to={`/products/${item.product_id}`}>
                <p className="productname">{productInfo.productName}</p>
              </Link>
              <p className="price">{formattedPrice}원</p>
              <p className="deliverymethod">택배배송 / 무료배송</p>
            </ProductDesc>
          </ProductInfo>
          <ProductCount>
            <button className="btn-minus" onClick={handleMinusButton}>
              <img src={MinusLine} alt="" />
            </button>
            <p>{count}</p>
            <button className="btn-plus" onClick={handlePlusButton}>
              <img src={PlusLine} alt="" />
            </button>
          </ProductCount>
          <ProductPrice>
            <p>{totalPrice}원</p>
            <button type="button">주문하기</button>
          </ProductPrice>
          <DeleteBtnStyle>
            <img src={DeleteBtn} alt="삭제버튼" onClick={handleDeleteItem} />
          </DeleteBtnStyle>
        </CartContainer>
      )}
    </>
  );
}

const CartContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 2fr 1fr 1fr;
  max-width: 1280px;
  margin: 10px auto;
  padding: 20px 0;
  padding: 20px 0;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  position: relative;
`;

const CheckBox = styled.button`
  place-items: center;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 40px;
`;

const ProductImage = styled(Link)`
  border: 1px solid #e0e0e0;
  border-radius: 10px;

  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    vertical-align: top;
    border-radius: 10px;
  }
`;

const ProductDesc = styled.div`
  padding: 10px 0;
  .storename,
  .deliverymethod {
    color: var(--color-grey);
    font-size: 14px;
  }

  .productname {
    font-size: 18px;
    padding: 10px 0 15px 0;
  }

  .price {
    font-size: 16px;
    font-weight: bold;
    padding-bottom: 40px;
  }
`;

const ProductCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 55px 0 70px 0;
  button {
    width: 60px;
    height: 60px;
  }

  .btn-minus {
    border: 1px solid var(--color-maingrey);
    border-radius: 5px 0 0 5px;
  }

  .btn-plus {
    border: 1px solid var(--color-maingrey);
    border-radius: 0 5px 5px 0;
  }

  p {
    width: 60px;
    height: 60px;
    font-size: 18px;
    line-height: 55px;
    text-align: center;
    color: inherit;
    border-top: 1px solid var(--color-maingrey);
    border-bottom: 1px solid var(--color-maingrey);
  }
`;

const ProductPrice = styled.div`
  text-align: center;

  p {
    padding-bottom: 25px;
    color: var(--color-red);
    font-weight: bold;
  }

  button {
    color: #fff;
    background-color: var(--color-green);
    width: 130px;
    height: 40px;
    border-radius: 5px;
  }
`;

const DeleteBtnStyle = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
`;
