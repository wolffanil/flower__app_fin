import { useRouter } from "next/navigation";
import styled from "./confirmedItem.module.css";
import {
  useCreateLike,
  useDeleteLike,
} from "@/lib/react-query/reactQueriesAndMutations";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

function ItemProduct({ item, order, user, isAdmin }) {
  const [isLike, setIsLike] = useState(false);
  // console.log(item, "Item4");

  useEffect(() => {
    if (isAdmin) return;
    const item1 = item.product?.likes?.some((item) => item.userId === user.id);
    if (item1) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [item]);

  const { isPending: isCreateLike, mutate: createLike } = useCreateLike();

  const { isPending: isDeleteLike, mutate: deleteLike } = useDeleteLike();

  const isLoading = isDeleteLike || isCreateLike;

  const router = useRouter();

  const handleCreateLike = async (id) => {
    if (isLoading) return;

    await createLike(id, {
      onError: (message) => {
        const messageError = errorMessage(message);

        if (messageError === "null") return;

        toast.error(`Ошибка: ${messageError}`);
        return;
      },
    });

    setIsLike(true);
  };

  const handleDeleteLike = async (id) => {
    if (isLoading) return;

    await deleteLike(id, {
      onError: (message) => {
        const messageError = errorMessage(message);

        if (messageError === "null") return;

        toast.error(`Ошибка: ${messageError}`);

        return;
      },
    });

    setIsLike(false);
  };

  return (
    <div className={styled.confirmedItem__items__block}>
      <Image
        src={item.product.imageUrl}
        alt="item"
        width={141}
        height={193}
        onClick={() => router.push(`/flower/${item.product._id}`)}
        className={styled.confirmedItem__items_photo}
      />
      <img
        src="/icons/plus.svg"
        alt="plus"
        className={styled.confirmedItem__items_plus}
      />
      <p className={styled.confirmedItem__items_number}>{item.quantity}</p>

      {order.status === "confirmed" && !isAdmin && (
        <div className={styled.confirmedItem__like}>
          {isLike ? (
            <Image
              src="/icons/heart-fill.svg"
              width={29}
              height={29}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="like"
              onClick={() => handleDeleteLike(item.product._id)}
            />
          ) : (
            <Image
              src="/icons/heart.svg"
              width={29}
              height={29}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="like"
              onClick={() => handleCreateLike(item.product._id)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ItemProduct;
