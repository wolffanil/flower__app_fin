"use client";

import { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import styled from "./sort.module.css";
import { useRouter } from "next/navigation";

const customStyles = {
  content: {
    top: "0",
    left: "auto",
    right: "0",
  },
};

const optionsKind = [
  { value: "Розы", label: "Розы" },
  { value: "Тюльпаны", label: "Тюльпаны" },
  { value: "Васелёк", label: "Васелёк" },
];

const optionsStyle = [
  { value: "Нежний", label: "Нежний" },
  { value: "Жёлтый", label: "Жёлтый" },
  { value: "Красный", label: "Красный" },
  { value: "Синий", label: "Синий" },
];

const optionsCountries = [
  { value: "Китай", label: "Китай" },
  { value: "Голандия", label: "Голандия" },
  { value: "Россия", label: "Россия" },
  { value: "Англия", label: "Англия" },
];

function SortForm({ children }) {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [kind, setKind] = useState(null);
  const [style, setStyle] = useState(null);
  const [country, setCountry] = useState(null);
  const [isClearable, setIsClearable] = useState(true);
  const [check, setCheck] = useState(false);

  const [gte, setGte] = useState(null);
  const [lte, setLte] = useState(null);

  const handleSort = () => {
    const kinds = kind?.value ? `kind=${kind.value}` : "";
    const styles = style?.value ? `&style=${style.value}` : "";
    const countrys = country?.value ? `&country=${country.value}` : "";
    const checks = check ? "&sort=-likes" : "";
    const ltes = lte ? `&price[lte]=${lte}` : "";
    const gtes = gte ? `&price[gte]=${gte}` : "";

    router.push(`/catalog?${kinds}${styles}${countrys}${ltes}${gtes}${checks}`);

    setModalIsOpen(false);
  };

  const handleReset = () => {
    setGte(null);
    setLte(null);
    setKind("");
    setStyle(null);
    setCheck(false);
    setCountry(null);
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      background: "#FDF4E5",
      paddingLeft: "10px",
      border: "none",
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        background: "#FDF4E5",
        paddingLeft: "10px",
        color: isSelected ? "#000" : "#000",
        fontWeight: isSelected ? "600" : undefined,
      };
    },
  };

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={styled.sort__form}
        ariaHideApp={false}
      >
        <div className={styled.sort__form}>
          <p className={styled.sort__p}>Цена</p>
          <div className={styled.sort__price__wrapper}>
            <p className={styled.sort__price__p}>от</p>

            <input
              className={styled.sort__price__input}
              type="number"
              value={gte}
              onChange={(e) => setGte(Number(e.target.value))}
            />

            <p className={styled.sort__price__p}>до</p>

            <input
              className={styled.sort__price__input}
              type="number"
              value={lte}
              onChange={(e) => setLte(Number(e.target.value))}
            />
          </div>

          <button className={styled.sort__button}>
            По популярности
            <input
              type="checkbox"
              value={check}
              onChange={(e) => setCheck(e.target.value)}
            />
          </button>

          <Select
            defaultValue={kind}
            onChange={setKind}
            options={optionsKind}
            placeholder="Вид цветов"
            isClearable={isClearable}
            styles={colourStyles}
            className={styled.sort__select}
          />

          <Select
            className={styled.sort__select}
            defaultValue={country}
            onChange={setCountry}
            options={optionsCountries}
            placeholder="Страна"
            isClearable={isClearable}
            styles={colourStyles}
          />
          <Select
            className={styled.sort__select}
            defaultValue={style}
            onChange={setStyle}
            options={optionsStyle}
            placeholder="Стиль"
            isClearable={isClearable}
            styles={colourStyles}
          />

          <div className={styled.sort__wrapper}>
            {/* <button onClick={handleReset} className={styled.sort__active}>
              Сбросить
            </button> */}

            <button className={styled.sort__active} onClick={handleSort}>
              Сортировать
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SortForm;
