import styled from "./sortButton.module.css";
import SortForm from "../sortForm/SortForm";

export const SortButton = () => {
  return (
    <SortForm>
      <button className={styled.sort__button}>СОРТИРОВКА</button>
    </SortForm>
  );
};
