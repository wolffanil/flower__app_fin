import styled from "./SortButton.module.css";
import SortForm from "../SortForm/SortForm";

export const SortButton = () => {
  return (
    <SortForm>
      <button className={styled.sort__button}>СОРТИРОВКА</button>
    </SortForm>
  );
};
