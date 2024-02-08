import styled from "./locateData.module.css";

export const LocateData = () => {
  return (
    <div className={styled.locate__data__wrapper}>
      <div className={styled.locate__data__row}>
        <p className={styled.locate__data__p_f}>Адрес</p>
        <p className={styled.locate__data__p_t}>г.Астрахань</p>
      </div>
      <div className={styled.locate__data__row}>
        <p className={styled.locate__data__p_f}>Телефон</p>
        <p className={styled.locate__data__p_t}>=7-999-111-11-11</p>
      </div>
      <div className={styled.locate__data__row}>
        <p className={styled.locate__data__p_f}>Режим работы</p>
        <p className={styled.locate__data__p_t}>
          Пн-Пт <br />с 10:00 до 22.00
        </p>
      </div>
    </div>
  );
};
