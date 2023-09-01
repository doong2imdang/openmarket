import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

export default function ProductDetailPage() {
  const URL = "https://openmarket.weniv.co.kr";
  const { product_id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product_id) {
      fetch(`${URL}/products/${product_id}/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("찾을 수 없습니다.");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setProduct(data);
          setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
          setProduct(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("상품 ID가 제공되지 않았습니다.");
      setLoading(false);
    }
  }, [product_id]);

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : product ? (
          <div>
            <h1>{product.product_name}</h1>
            <img src={product.image} alt={product.product_name} />
            <p>가격: {product.price}원</p>
            <p>배송 방법: {product.shipping_method}</p>
            <p>배송 비용: {product.shipping_fee}원</p>
            <p>재고: {product.stock}개</p>
            <p>상품 정보: {product.products_info}</p>
            <p>판매자: {product.seller}</p>
            <p>판매처: {product.store_name}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
