"use client";

import Slider from "react-slick";
import styled from "./slider.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardItem from "@/components/ui/cardItem/CardItem";

function SliderComponent({ products }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <h3 className={styled.slider__title}>НОВИНКИ КОМПАНИИ</h3>

      <div className={styled.slider__wrapper}>
        <Slider {...settings}>
          {products.map((item, key) => (
            <CardItem card={item} key={key} pathname="/aboutus" />
          ))}
        </Slider>
      </div>
    </>
  );
}

export default SliderComponent;
