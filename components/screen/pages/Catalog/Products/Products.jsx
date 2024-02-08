"use client";

import CardItem from "@/components/ui/cardItem/CardItem";
import styled from "./product.module.css";
import ScrollToTop from "react-scroll-to-top";

function Products({ flowers }) {
  return (
    <div className={styled.products__wrapper}>
      {flowers?.map((item, key) => (
        <CardItem card={item} key={key} isButton="true" />
      ))}
      <ScrollToTop smooth color="#DDD3C7" top={70} style={{
        borderRadius: '20px',
        right: '10px'
      }} />
    </div>
  );
}

export default Products;
