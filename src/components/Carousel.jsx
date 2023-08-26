import React, { useState, useRef, useEffect } from "react";
import carousel1 from "../assets/carousel/carousel1.jpg";
import carousel2 from "../assets/carousel/carousel2.jpg";
import carousel3 from "../assets/carousel/carousel3.jpg";
import carousel4 from "../assets/carousel/carousel4.jpg";
import carousel5 from "../assets/carousel/carousel5.jpg";
import carousel6 from "../assets/carousel/carousel6.jpg";
import carousel7 from "../assets/carousel/carousel7.jpg";
import swiper1 from "../assets/icon/icon-swiper-1.svg";
import swiper2 from "../assets/icon/icon-swiper-2.svg";
import Slider from "./Slider";
import styled from "styled-components";

const images = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
];
const TOTAL_SLIDES = images.length - 1;

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
  }, [currentSlide]);

  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Container>
      <SliderContainer ref={slideRef}>
        {images.map((img, index) => (
          <Slider key={index} img={img} />
        ))}
      </SliderContainer>
      <ButtonCotainer>
        <button className="prevBtn" type="button" onClick={PrevSlide}>
          <img src={swiper1} alt="" />
        </button>
        <button className="nextBtn" type="button" onClick={NextSlide}>
          <img src={swiper2} alt="" />
        </button>
      </ButtonCotainer>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
  max-height: 500px;
`;

const SliderContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
`;

const ButtonCotainer = styled.div`
  display: flex;
  justify-content: space-between;

  .prevBtn,
  .nextBtn {
    position: absolute;
  }

  .prevBtn {
    top: 280px;
  }

  .nextBtn {
    top: 280px;
    right: 0;
  }
`;
