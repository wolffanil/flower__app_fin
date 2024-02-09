"use client";

import Image from "next/image";
import Link from "next/link";

import styled from "./carditem.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthContext } from "@/context/AuthContext";
import { errorMessage } from "@/lib/errorMessage";
import { useAddProduct } from "@/lib/react-query/reactQueriesAndMutations";

const photoStyle = {
  "/aboutus": styled.cartItem__photo_aboutus,
  "/": styled.cartItem__photo_root,
};

function CardItem({ card, pathname, isButton }) {
  const { isAuthenticated } = useAuthContext();

  const { isLoading: isAddProductLoading, mutate: addProduct } =
    useAddProduct();

  const handleAddProduct = async () => {
    if (!isAuthenticated) {
      toast.error("Пожалуйста авторизируйтесь чтобы дабавь товар в карзину");
      router.push("/login");

      return;
    }

    if (isAddProductLoading) return;

    const id = toast.loading("Идёт дабавление товара...");

    await addProduct(
      { productId: card._id, maxQuantity: card.quantity },
      {
        onSuccess: () => {
          toast.success("Товар успешно дабавлен", { id });
        },
        onError: (message) => {
          const messageError = errorMessage(message);
          if (messageError === null) return;
          toast.error(`Ошибка: ${messageError}`, {
            id,
          });
        },
      }
    );
  };

  const router = useRouter();

  return (
    <div className={styled.cartItem}>
      {isButton ? (
        <Image
          className={styled.cartItem__buy}
          src="/icons/buy.svg"
          width={57}
          height={57}
          alt="buy"
          onClick={handleAddProduct}
        />
      ) : (
        ""
      )}
      <Link href={`/flower/${card._id}`}>
        <Image
          src={card.imageUrl}
          alt="item"
          width={376}
          height={511}
          className={`${styled.cartItem__photo} ${
            pathname && photoStyle[pathname]
          }`}
        />
      </Link>

      <h3 className={styled.cartItem__title}>{card.name.toUpperCase()}</h3>

      <p className={styled.cartItem__price}>{card.price} р</p>

      {isButton ? (
        <button
          onClick={() => router.push(`/flower/${card._id}`)}
          className={styled.cartItem__button}
        >
          ПОДРОБНЕЕ
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default CardItem;
