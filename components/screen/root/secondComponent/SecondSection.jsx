import CardItem from "@/components/ui/cardItem/CardItem"
import styled from './second.module.css';
import SliderFlower from "./SliderFlower";
import Image from "next/image";

async function SecondSection({cards}) {


  return (
    <section className={styled.popular}>

      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={415}
        height={443}
        className={styled.popular__sheet_left}
      />

      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={415}
        height={443}
        className={styled.popular__sheet_rigth}
      />

      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={75}
        height={80}
        className={styled.popular__sheet_left_buttom}
      />

      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={88}
        height={94}
        className={styled.popular__sheet_rigth_buttom}
      />


        <h2 className={styled.popular__title}>ПОПУЛЯРНЫЕ ТОВАРЫ</h2>

        <div className={styled.popular__wrapper}>
            
            {!!cards && cards.map((card, key) => (
                <CardItem card={card} key={key} /> 
            ))}


        </div>


        <div className={styled.popular__wrapper__slider}>
          <SliderFlower cards={cards} />
        </div>


    </section>
  )
}

export default SecondSection;