import Image from "next/image";
import styled from "./firstComponent.module.css";
import Link from "next/link";

function FirstComponent() {
  return (
    <section className={styled.first}>
      <Image
        src="/icons/logoLIte.svg"
        alt="logo"
        width={168}
        height={230}
        className={styled.first__logo}
      />
      <h1 className={styled.first__title}>
        ПРЕВРАТИМ ВАШИ
        <br className={styled.first__br} />
        ЧУВСТВА
        <br />В ИЗЫСКАННЫЕ БУКЕТЫ
      </h1>

      <p className={styled.first__desc}>БОЛЬШЕ ЧЕМ ПРОСТО ЦВЕТЫ</p>
    </section>
  );
}

export default FirstComponent;
