import { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "./commentModal.module.css";
import toast from "react-hot-toast";
import {
  useCreateComment,
  useDeleteComment,
  useEditComment,
} from "@/lib/react-query/reactQueriesAndMutations";
import { errorMessage } from "@/lib/errorMessage";
import { useRouter } from "next/navigation";

const customStyles = {
  content: {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

function CommentModal({ children, user, setUser }) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isMyComment, setIsMyComment] = useState(false);

  useEffect(() => {
    if (modalIsOpen && !user.name) {
      router.push("/login");
      setModalIsOpen(false);
    } else if (user?.comment) {
      setText(user.comment);
      setIsMyComment(true);

      if (modalIsOpen) {
        document.body.style.overflowY = "hidden";
      }
    } else {
      setText("");
      if (modalIsOpen) {
        document.body.style.overflowY = "hidden";
      }

      setIsMyComment(false);
    }

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, [user, modalIsOpen]);

  const { isPending: isLoadingEdit, mutate: editComment } = useEditComment();
  const { isPending: isLoadingDelete, mutate: deleteComment } =
    useDeleteComment();

  const { isPending: isCreateComment, mutate: createComment } =
    useCreateComment();

  const isLoading = isCreateComment || isLoadingDelete || isLoadingEdit;

  const handleDeleteComment = async () => {
    const id = toast.loading("Загрузка удаленние");

    await deleteComment("", {
      onSuccess: () => {
        toast.success("каментирий удалённ", { id });
        setText("");
        setUser((data) => ({ ...data, comment: "" }));
        closeModal();
      },
      onError: (message) => {
        const messageError = errorMessage(message);
        if (messageError === null) return;
        toast.error(`Ошибка: ${messageError}`, { id });
      },
    });
  };

  const handleEditComment = async () => {
    const id = toast.loading("Загрузка редактирование...");

    const my = user?.comment ? user.comment : "";

    if (my === text) {
      toast.error("отзыв небыл изменнён", { id });
      return;
    }

    await editComment(text, {
      onSuccess: () => {
        toast.success("каментирий редактированн", { id });
        setText("");
        closeModal();
      },
      onError: (message) => {
        const messageError = errorMessage(message);
        if (messageError === null) return;
        toast.error(`Ошибка: ${messageError}`, { id });
      },
    });
  };

  const handleCreateComment = async () => {
    const id = toast.loading("Загрузка создание...");

    await createComment(text, {
      onSuccess: () => {
        toast.success("каментирий создан", { id });
        setText("");
        closeModal();
        setUser((data) => ({ ...data, comment: text }));
      },
      onError: (message) => {
        const messageError = errorMessage(message);
        if (messageError === null) return;
        toast.error(`Ошибка: ${messageError}`, { id });
      },
    });
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    document.body.style.overflowY = "scroll";
  }

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={styled.comment__modal}
        ariaHideApp={false}
      >
        <div className={styled.comment__modal}>
          <p className={styled.comment__modal__title}>
            {isMyComment ? "Редактировать" : "Написать отзыв"}
          </p>

          <textarea
            cols="30"
            rows="10"
            className={styled.comment__modal__input}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <div className={styled.comment__modal__wrapper}>
            <button
              className={styled.comment__modal__close}
              onClick={closeModal}
              disabled={isLoading}
            >
              Закрыть
            </button>
            {isMyComment ? (
              <button
                className={styled.comment__modal__close}
                disabled={isLoading}
                onClick={handleDeleteComment}
              >
                Удалить
              </button>
            ) : (
              ""
            )}
            <button
              className={styled.comment__modal__post}
              disabled={isLoading}
              onClick={isMyComment ? handleEditComment : handleCreateComment}
            >
              {isMyComment ? "Редактировать" : "Отправить"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CommentModal;
