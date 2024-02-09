import { footerLink } from "@/constants/footerLink";
import Image from "next/image";
import styled from "./footer.module.css";
import Link from "next/link";

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
          <Link href="/">
            <Image
              src="/icons/logoblack.svg"
              alt="logo"
              width={214}
              height={214}
              className={styled.footer__first__column__logo}
            />
          </Link>
          <p className={styled.footer__first__column__p}>
            <a
              href="https://astrahan.rus-buket.ru/public/personal-data-ru.pdf"
              className={styled.footer__first__column__p}
            >
              ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
            </a>
          </p>
        </div>
        <div className={styled.footer__second__column}>
          <ul>
            <li className={styled.footer__second__third__column__li}>
              <Link href="/catalog" className={styled.footer__link}>
                КАТАЛОГ
              </Link>
            </li>
            <li className={styled.footer__second__third__column__li}>
              <Link href="/aboutus" className={styled.footer__link}>
                О НАС
              </Link>
            </li>
            <li className={styled.footer__second__third__column__li}>
              <Link href="/map" className={styled.footer__link}>
                КАРТА
              </Link>
            </li>
            <li className={styled.footer__second__third__column__li}>
              <Link href="/" className={styled.footer__link}>
                ПОМОЩЬ
              </Link>
            </li>
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
              <Link href="/" className={styled.footer__link}>
                ДОСТАВКА И ОПЛАТА
              </Link>
            </li>
            <li className={styled.footer__second__third__column__li}>
              <Link href="/" className={styled.footer__link}>
                ПУБЛИЧНАЯ ОФЕРА
              </Link>
            </li>
            <li className={styled.footer__second__third__column__li}>
              <Link href="/" className={styled.footer__link}>
                УХОД ЗА БУКЕТОМ
              </Link>
            </li>
            <li className={styled.footer__second__third__column__li}>
              <Link href="/" className={styled.footer__link}>
                УСЛУГИ И СЕРВИСЫ
              </Link>
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

        <p className={styled.footer__politic}>
          <a
            href="https://astrahan.rus-buket.ru/public/personal-data-ru.pdf"
            className={styled.footer__first__column__p}
          >
            ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
          </a>
        </p>
      </div>
    </footer>
  );
}
