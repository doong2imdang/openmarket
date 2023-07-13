import React from "react";
import styled from "styled-components";

export default function Slider({ img }) {
  return <IMG src={img} />;
}

const IMG = styled.img`
  width: 100%;
  min-height: 500px;
`;
