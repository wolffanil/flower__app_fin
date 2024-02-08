import Image from "next/image";
import styled from "./layout.module.css";
import Title from "@/components/ui/title/Title";

const LayoutPages = ({ children }) => {
  return (
    <section className={styled.section}>
      <Title />
      <Image
        src="/icons/sheet.svg"
        width={432}
        height={504}
        alt="sheet"
        className={styled.section__sheet_left}
      />
      <div className={styled.section__container}>{children}</div>

      <Image
        src="/icons/sheet.svg"
        width={432}
        height={504}
        alt="sheet"
        className={styled.section__sheet_right}
      />
    </section>
  );
};

export default LayoutPages;
