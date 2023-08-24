import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import styled from "styled-components";

export default function HomePage() {
  return (
    <>
      <Header />
      <Main>
        <Carousel />
      </Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  height: 500px;
`;
