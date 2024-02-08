"use client";

import Image from "next/image";
import styled from "./cartOrder.module.css";
import { useState } from "react";
import {
  useAddOne,
  useDeleteProductFromCart,
  useReduceCart,
} from "@/lib/react-query/reactQueriesAndMutations";
import toast from "react-hot-toast";

export default function CartOrder({ item, finished }) {
  const { isPending: isDeleteProduct, mutate: deletProduct } =
    useDeleteProductFromCart();
  const { mutate: addOne } = useAddOne();
  const { mutate: reduce } = useReduceCart();

  const [isAdd, setIsAdd] = useState(false);

  const [col, setCol] = useState(item.quantity || 0);

  const handleDelete = async () => {
    const id = toast.loading("Загрузка...");

    await deletProduct(item.product._id, {
      onSuccess: () => {
        toast.success("Товар успешнно удаллён", { id });
      },
      onError: (message) =>
        toast.error(`Ошибка: ${message.toString().split("Error: ")[1]}`, {
          id,
        }),
    });
  };

  const handleAddOne = () => {
    setCol((n) => n + 1);

    addOne(item.product._id, {
      onError: (message) => {
        toast.error(`Ошибка ${message.toString().split("Error: ")[1]}`);
        setIsAdd((is) => !is);
        setCol((n) => n - 1);
      },
    });
  };

  const handleReduce = () => {
    console.log("reduce");
    if (col !== 1) {
      setCol((n) => n - 1);

      reduce(item.product._id, {
        onError: (message) => {
          toast.error(`Ошибка ${message.toString().split("Error: ")[1]}`);
        },
        onSuccess: () => {
          // console.log(isAdd, "Dfd");
          // if (!isAdd) {
          //   setIsAdd((is) => !is);
          // }
          setIsAdd(false);
        },
      });
    }
  };

  const { name, description, imageUrl, price, _id } = item.product;

  let isFinished;

  console.log(finished, "fin");

  if (finished?.product?.name) {
    isFinished = finished.product._id == _id;
  } else if (finished) {
    isFinished = finished.some((item) => item.product._id === _id);
  }

  return (
    <div className={styled.cart}>
      <img
        src={imageUrl}
        alt="flower"
        width={350}
        height={400}
        className={`${styled.cart__image} ${
          isFinished ? styled.cart__image_filter : ""
        }`}
      />
      <div className={styled.cart__elems}>
        <div className={styled.cart__elems__first__row}>
          <p className={styled.cart__elem__title}>{name}</p>
          <button
            className={styled.cart__button}
            disabled={isDeleteProduct}
            onClick={handleDelete}
          >
            <Image
              src="/icons/trash.svg"
              alt="trash"
              width={30}
              height={35}
              className={styled.cart__delete}
            />
          </button>
        </div>
        <p className={styled.cart__elem__desc}>{description}</p>
        <div className={styled.cart__elem__count__wrapper}>
          {isFinished ? (
            <div className={styled.cart__not}>Товар закончился</div>
          ) : (
            <div className={styled.cart__elem__count}>
              <button
                className={styled.cart__elem__count__button}
                onClick={handleReduce}
              >
                -
              </button>
              <p className={styled.cart__elem__cost}>{col}</p>
              <button
                className={styled.cart__elem__count__button}
                onClick={handleAddOne}
                disabled={isAdd}
              >
                +
              </button>
            </div>
          )}
          <p className={styled.cart__elem__cost}>{col * price} р</p>
        </div>
      </div>
    </div>
  );
}
