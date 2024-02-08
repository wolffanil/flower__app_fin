import { footerLink } from "@/constants/footerLink";
import Image from "next/image";
import styled from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styled.footer}>
      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={415}
        height={504}
      
        className={styled.footer__sheet_left}
      />

      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={415}
        height={504}
        className={styled.footer__sheet_right}
      />
      <div className={styled.footer__container}>
        <div className={styled.footer__first__column}>
          <Image
            src="/icons/logoblack.svg"
            alt="logo"
            width={214}
            height={214}
            className={styled.footer__first__column__logo}
          />
          <p className={styled.footer__first__column__p}>
            ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
          </p>
        </div>
        <div className={styled.footer__second__column}>
          <ul>
            <li className={styled.footer__second__third__column__li}>
              КАТАЛОГ
            </li>
            <li className={styled.footer__second__third__column__li}>АКЦИИ</li>
            <li className={styled.footer__second__third__column__li}>
              ВАКАНСИИ
            </li>
            <li className={styled.footer__second__third__column__li}>ПОМОЩЬ</li>
          </ul>
          <ul className={styled.footer__second__column__cards}>
            <li>
              <Image
                src="/icons/visa.svg"
                alt="visa"
                width={66}
                height={44}
                className={styled.footer__second__column__cards__logo}
              />
            </li>
            <li>
              <Image
                src="/icons/paypal.svg"
                alt="paypal"
                width={66}
                height={44}
                className={styled.footer__second__column__cards__logo}
              />
            </li>
          </ul>
        </div>
        <div className={styled.footer__third__column}>
          <ul>
            <li className={styled.footer__second__third__column__li}>
              ДОСТАВКА И ОПЛАТА
            </li>
            <li className={styled.footer__second__third__column__li}>
              ПУБЛИЧНАЯ ОФЕРА
            </li>
            <li className={styled.footer__second__third__column__li}>
              УХОД ЗА БУКЕТОМ
            </li>
            <li className={styled.footer__second__third__column__li}>
              УСЛУГИ И СЕРВИСЫ
            </li>
          </ul>

          <ul className={styled.footer__second__column__media}>
            {footerLink.map((link, key) => (
              <li key={key}>
                <a href={link.href}>
                  <Image
                    src={link.image}
                    alt={link.alt}
                    width={50}
                    height={50}
                    className={styled.footer__second__column__media__logo}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className={styled.footer__politic}>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</p>
      </div>
    </footer>
  );
}
