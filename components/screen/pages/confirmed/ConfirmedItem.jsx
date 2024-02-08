"use client";

import { useRouter } from "next/navigation";

import styled from "./confirmedItem.module.css";
import {
  useConfirmedOrder,
  useCreateLike,
  useDeleteLike,
  useDeleteOrder,
} from "@/lib/react-query/reactQueriesAndMutations";
import toast from "react-hot-toast";
import { errorMessage } from "@/lib/errorMessage";
import CanceledModal from "./CanceledModal";
import Image from "next/image";
import { useState } from "react";
import ItemProduct from "./ItemProduct";

function ConfirmedItem({ order, user, isAdmin }) {
  const userCorrent = isAdmin ? order.user : user;

  
  // const isLike = order.likes.find((item) => item.userId === user.id);

  const { items, status } = order;

  const { isPending: isLoadingDeleting, mutate: deleteOrder } =
    useDeleteOrder();

  const { isPending: isLoadingConfirming, mutate: confirmeOrder } =
    useConfirmedOrder();




  

  const isLoading = isLoadingConfirming || isLoadingDeleting


  const handleDeleteOrder = async () => {
    const id = toast.loading("Удаление заказа...");

    await deleteOrder(order._id, {
      onSuccess: () => {
        toast.success("Заказ успешнно удалён", { id });
      },

      onError: (message) => {
        const messageError = errorMessage(message);
        if (messageError === null) return;
        toast.error(`Ошибка: ${messageError}`, { id });
      },
    });
  };

  const handleConfirmeOrder = async () => {
    const id = toast.loading("Потверждение заказа...");

    await confirmeOrder(order._id, {
      onSuccess: () => {
        toast.success("Заказ успешнно потверждённ", { id });
      },

      onError: (message) => {
        const messageError = errorMessage(message);
        if (messageError === null) return;
        toast.error(`Ошибка: ${messageError}`, { id });
      },
    });
  };

  return (
    <div className={styled.confirmedItem}>
      <div className={styled.confirmedItem__info}>
        <p className={styled.confirmedItem__info__title}>Получатель</p>
        <input
          type="text"
          disabled={true}
          value={userCorrent.name}
          className={styled.confirmedItem__info__input}
        />

        {isAdmin ? (
          <>
            <input
              type="text"
              disabled={true}
              value={userCorrent.surname}
              className={styled.confirmedItem__info__input}
            />

            <input
              type="text"
              disabled={true}
              value={userCorrent.patronymic}
              className={styled.confirmedItem__info__input}
            />
          </>
        ) : (
          ""
        )}
        <input
          type="tel"
          disabled={true}
          value={order.phone}
          className={styled.confirmedItem__info__input}
        />
        <input
          type="email"
          disabled={true}
          value={user.email}
          className={styled.confirmedItem__info__input}
        />

        <p className={styled.confirmedItem__info__title}>Дата и время</p>
        <input
          type="time"
          disabled={true}
          value={order.time}
          className={styled.confirmedItem__info__input}
        />
        <input
          type="text"
          disabled={true}
          value={order.date.split("T")[0]}
          className={styled.confirmedItem__info__input}
        />

        <p className={styled.confirmedItem__info__title}>Адрес</p>
        <input
          type="text"
          disabled={true}
          value={order.address}
          className={styled.confirmedItem__info__input}
        />
      </div>

      <div className={styled.confirmedItem__line} />

      <div className={styled.confirmedItem__items}>
        <div className={styled.confirmedItem__items__wrapper}>
          {items.map((item, key) => (
            <ItemProduct key={key} item={item} order={order} user={user} isAdmin={isAdmin}/>
          ))}
        </div>

        <p className={styled.confirmedItem__items_price}>
          {order.priceFinall} р
        </p>

        <p className={styled.confirmedItem__status}>
          Статус заказа:{" "}
          <span
            className={`${
              status === "new"
                ? styled.confirmedItem__status_new
                : status === "confirmed"
                ? styled.confirmItem__status_confirmed
                : styled.confirmItem__status_canceled
            }`}
          >
            {status}
          </span>
        </p>

        {isAdmin ? (
          <CanceledModal
            cartId={order._id}
            cause={order?.cause ? order.cause : ""}
          >
            <button
              className={styled.confirmedItem__items_button}
              disabled={isLoading}
            >
              Отменить заказ
            </button>
          </CanceledModal>
        ) : order.status !== "confirmed" ? (
          <button
            className={styled.confirmedItem__items_button}
            onClick={handleDeleteOrder}
            disabled={isLoading}
          >
            Отменить заказ
          </button>
        ) : (
          ""
        )}

        {isAdmin && order.status !== "confirmed" ? (
          <button
            className={styled.confirmedItem__items_button}
            onClick={handleConfirmeOrder}
            disabled={isLoading}
          >
            Подвердить заказ
          </button>
        ) : (
          ""
        )}

        {order?.cause ? (
          <p className={styled.confirmedItem__cause}>
            Сообщение от администратора: {order.cause}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ConfirmedItem;
