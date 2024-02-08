"use client";

import styled from "./burder.module.css";
import Modal from "react-modal";
import { useState } from "react";

import { navLinks } from "@/constants/nav";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";

const customStyles = {
  content: {
    top: "10px",
    left: "auto",
    right: "0",
  },
};

const Burger = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuthContext();

  function openModal() {
    document.body.style.overflowY = "hidden";
    setModalIsOpen(true);
  }

  function closeModal() {
    document.body.style.overflowY = "scroll";
    setModalIsOpen(false);
  }

  function handleClick() {
    document.body.style.overflowY = "scroll";

    setModalIsOpen(false);
  }

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={styled.menu}
        ariaHideApp={false}
      >
        <div className={styled.menu}>
          {navLinks.map((link, key) => (
            <li key={key} onClick={handleClick}>
              <Link href={link.href} className={styled.menu__link}>
                {link.label.toLowerCase()}
              </Link>
            </li>
          ))}
          {!isLoading && !isAuthenticated && (
            <li onClick={handleClick}>
              <Link href="/login" className={styled.menu__link}>
                войти
              </Link>
            </li>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Burger;
