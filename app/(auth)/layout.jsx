import Image from "next/image";
import styled from "./layout.module.css";
import "../globals.css";

const LayoutAuth = ({ children }) => {
  return (
    <section className={styled.auth}>
      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={432}
        height={504}
        className={styled["sheet-left"]}
        priority
      />

      {children}
      <Image
        src="/icons/sheet.svg"
        alt="sheet"
        width={432}
        height={504}
        className={styled["sheet-right"]}
        priority
      />
    </section>
  );
};

export default LayoutAuth;
