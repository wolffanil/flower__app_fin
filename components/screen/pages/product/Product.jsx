"use client";
import { notFound } from "next/navigation";
import styled from "./product.module.css";

import Image from "next/image";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useAddProduct,
  useDeleteProduct,
} from "@/lib/react-query/reactQueriesAndMutations";
import { errorMessage } from "@/lib/errorMessage";

function Product({ product }) {
  const { isAuthenticated, isLoading: isLoadingAuth, user } = useAuthContext();

  const router = useRouter();

  const { isLoading: isAddProductLoading, mutate: addProduct } =
    useAddProduct();

  const { isPending: isDeleting, mutate: deleteProduct } = useDeleteProduct();

  if (!product?.name) return notFound();

  const isLoading = isLoadingAuth || isAddProductLoading || isDeleting;

  const AddLocalStoraga = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("flower");
      localStorage.setItem("flower", JSON.stringify(product));
    }
    router.push("/admin");
  };

  const handleDeleteProduct = async () => {
    const id = toast.loading("Загрузка удаление продукта...");

    await deleteProduct(
      { productId: product._id, imageUrl: product?.imageUrl },
      {
        onSuccess: () => {
          toast.success("Товар успешно удалён", { id });
          router.push("/");
          return;
        },
        onError: (message) => {
          const messageError = errorMessage(message);
          toast.error(`Ошибка: ${messageError}`, { id });
          return;
        },
      }
    );
  };

  const handleAddProduct = async () => {
    if (!isAuthenticated) {
      toast.error("Пожалуйста авторизируйтесь чтобы дабавить товар в карзину");
      router.push("/login");

      return;
    }

    const id = toast.loading("Идёт дабавление товара...");

    await addProduct(
      { productId: product._id, maxQuantity: product.quantity },
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

  // const desc = product.description.split(".");

  return (
    <div className={styled.product}>
      <Image
        className={styled.product__photo}
        src={`${product.imageUrl}`}
        width={373}
        height={511}
        alt="flower"
      />

      <div className={styled.product__article}>
        <div className={styled.product__info}>
          <h2 className={styled.product__title}>
            {product.name.toUpperCase()}
          </h2>

          {user.isAdmin ? (
            <div className={styled.product__tools}>
              <button onClick={AddLocalStoraga}>
                <Image
                  src="/icons/edit.svg"
                  alt="edit"
                  width={30}
                  height={30}
                  className={styled.product__edit}
                />
              </button>

              <button onClick={handleDeleteProduct}>
                <Image
                  src="/icons/trash.svg"
                  alt="delete"
                  width={30}
                  height={30}
                  className={styled.product__delete}
                />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <p className={styled.product__price}>{product.price} р</p>

        <p className={styled.product__made}>
          Страна производитель :{" "}
          {`${product.made[0].toUpperCase()}${product.made.slice(1)}`}
        </p>

        <p className={styled.product__kind}>Вид цветов:</p>

        {/* {desc.map((item, key) => {
          const compound = item.split("-");

          if(compound[0]?.length < 2) return;
          

          return (
            <div className={styled.product__wrapper} key={key}>
              <span className={styled.product__span}>{compound[0]}</span>
              <p> - </p>
              <p>{compound[1]}.</p>
            </div>
          );
        })} */}

        <p className={styled.product__desc}>{product.kind}</p>

        <p className={styled.product__style}>Стиль:</p>

        <p className={styled.product__desc}>{product.type}</p>

        {(product?.quantity && isAuthenticated) > 0 ? (
          <button
            className={styled.product__button}
            disabled={isLoading}
            onClick={handleAddProduct}
          >
            В КОРЗИНУ
          </button>
        ) : isAuthenticated ? (
          <div className={styled.product__not}>Товар закончился</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Product;
