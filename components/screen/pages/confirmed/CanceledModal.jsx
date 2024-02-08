"use client";

import { useState } from "react";
import styled from "./canceledModal.module.css";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useCanceledOrder } from "@/lib/react-query/reactQueriesAndMutations";
import { errorMessage } from "@/lib/errorMessage";

const customStyles = {
  content: {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

function CanceledModal({ children, cartId, cause }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [text, setText] = useState(cause);

  const { isPending: isLoadingCanceling, mutate: canceledOrder } =
    useCanceledOrder();

  const handleCanceled = async () => {
    if (text.length < 10) {
      toast.error("Введите мин 10 символов");
      return;
    }
    const id = toast.loading("Отмена заказа");

    await canceledOrder(
      { cartId, cause: text },
      {
        onSuccess: () => {
          toast.success("Заказ успешно отменнён", { id });
          closeModal();
        },
        onError: (message) => {
          const messageError = errorMessage(message);
          if (messageError === null) return;
          toast.error(`Ошибка: ${messageError} `, { id });
        },
      }
    );
  };

  function openModal() {
    document.body.style.overflowY = "hidden";
    setModalIsOpen(true);
  }

  function closeModal() {
    document.body.style.overflowY = "scroll";

    setModalIsOpen(false);
  }

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={styled.canceled}
        ariaHideApp={false}
      >
        <div className={styled.canceled}>
          <p className={styled.canceled__title}>Напиши причину отмены заказа</p>

          <textarea
            cols="30"
            rows="10"
            className={styled.canceled__input}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className={styled.canceled__wrapper}>
            <button
              className={styled.canceled__close}
              onClick={closeModal}
              disabled={isLoadingCanceling}
            >
              Закрыть
            </button>
            <button
              className={styled.canceled__post}
              disabled={isLoadingCanceling}
              onClick={handleCanceled}
            >
              Отправить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CanceledModal;
