"use client";

import { useAuthContext } from "@/context/AuthContext";
import styled from "./profile.module.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useLogoutAccount } from "@/lib/react-query/reactQueriesAndMutations";
import { useRouter } from "next/navigation";

const customStyles = {
  content: {
    top: "0",
    left: "auto",
    right: "0",
  },
};

const Profile = ({ children }) => {
  const { user, setUser, setIsAuthenticated, isLoading, isAuthenticated } =
    useAuthContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { isPending: isLogoutLoading, mutate: logout } = useLogoutAccount();

  const router = useRouter();


  function openModal() {
    document.body.style.overflowY = "hidden";
    setModalIsOpen(true);
  }

  function closeModal() {
    document.body.style.overflowY = "scroll";

    setModalIsOpen(false);
  }

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("flower");
    }

    setIsAuthenticated(false);
    setUser({});
    logout();
    document.body.style.overflowY = "scroll";

    router.push("/aboutus");
  };

  if (!user) return null;

  return (
    <>
      <div onClick={openModal}>{children || <></>}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={styled.profile}
        ariaHideApp={false}
      >
        <div className={styled.profile}>
          <p className={styled.profile__name}>{user?.name}</p>
          <button
            className={styled.profile__button}
            onClick={() => {
              closeModal();
              router.push("/confirmed");
            }}
          >
            Покупки
          </button>

          <button className={styled.profile__button} onClick={handleLogout}>
            Выйти
          </button>

          {user?.isAdmin && isAuthenticated ? (
            <>
              <button
                className={styled.profile__button}
                onClick={() => {
                  closeModal();

                  router.push("orders");
                }}
              >
                Заказы пользователей
              </button>

              <button
                className={styled.profile__button}
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("flower");
                  }

                  router.push("/admin");
                  closeModal();
                }}
              >
                Добавить товар
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
};

export default Profile;
