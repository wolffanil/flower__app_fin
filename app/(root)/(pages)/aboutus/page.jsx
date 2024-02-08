import Image from "next/image";
import styled from "./page.module.css";
import SliderComponent from "@/components/screen/pages/AboutUs/SliderComponent";

export const metadata = {
  title: 'О нас',
  description: 'Цветы - это больше чем слова',
  alternates: {
    canonical: `${process.env.CLIENT_URL}aboutus`,
  }
}

async function getFlowers() {
  try {
    const api = process.env.API_URL;
    const res = await fetch(`${api}/products?limit=5&sort=-createAt`, {
      next: {
        revalidate: 120,
      },
    });

    const data = await res.json();
    return data.products;
  } catch (error) {
    console.log(error.message);
  }
}

async function AboutPage() {
  const flowers = await getFlowers();

  return (
    <>
      <Image
        src="/icons/logoblack.svg"
        width={220}
        height={300}
        alt="logo"
        className={styled.aboutUs__logo}
      />

      <h2 className={styled.aboutUs__title}>ЦВЕТЫ - ЭТО БОЛЬШЕ, ЧЕМ СЛОВА</h2>

      {flowers ? <SliderComponent products={flowers} /> : ""}
    </>
  );
}

export default AboutPage;
