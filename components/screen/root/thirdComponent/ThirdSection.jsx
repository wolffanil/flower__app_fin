import Image from "next/image";
import Link from "next/link";
import styled from "./third.module.css";

function ThirdSection() {
  return (
    <section className={styled.sale}>
      <Image
        src='/icons/sheet.svg'
        alt="sheet"
        width={415}
        height={443}
        className={styled.sale__sheet_left}
      />

      <Image
        src='/icons/sheet.svg'
        alt="sheet"
        width={415}
        height={443}
        className={styled.sale__sheet_rigth}
      />

        <div className={styled.sale__container}>
            <Image className={styled.sale__img} 
            src='/image/flowers.jpg'
            alt='flowers'
            width={541}
            height={662}
            />
            <div className={styled.sale__wrapper}>
                <p className={styled.sale__interest}>СКИДКА 15%</p>
                <p className={styled.sale__desc}>На первый заказ, при <br/> покупке от 3000 рублей</p>
                <Link href='/catalog' className={styled.link}>
                <button className={styled.sale__button}>В КАТАЛОГ</button>
                </Link>
            </div>

        </div>
    </section>
  )
}

export default ThirdSection;