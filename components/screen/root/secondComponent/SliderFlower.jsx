"use client"

import CardItem from "@/components/ui/cardItem/CardItem";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "react-scroll-to-top";


function SliderFlower({cards}) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
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
    <Slider {...settings}>
        {cards.map((item, key) => (
        <CardItem card={item} key={key} pathname="/" />
        ))}
    </Slider>
      <ScrollToTop smooth color="#DDD3C7" top={70} style={{
        borderRadius: '20px',
        right: '10px'
      }} />
          
    </>
    )
}

export default SliderFlower;