"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useGetCart } from "@/lib/react-query/reactQueriesAndMutations";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CartOrder from "./CartOrder";

import styled from "./cart.module.css";

function Cart() {
  const { data: cart, isPending: isGetCartLoading } = useGetCart();
  const router = useRouter();

  const { isLoading, isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
  }, [isAuthenticated, isLoading]);

  if (isGetCartLoading) return <div>Loading...</div>;

  if (cart?.items.length < 1) return <div>Товаров нету</div>;

  if (!user) return <></>;

  const finished = cart.items.filter((item) => item.isFinished === true);

  return (
    <>
      <div>
        {cart.items.map((item, index) => (
          <CartOrder key={index} item={item} finished={finished} />
        ))}

        {cart.items.length ? (
          <button
            className={styled.cart__button}
            onClick={() => {
              if (finished?.product?.name || finished?.product?.length > 0) {
                toast.error(`один или несколько товаров закончились`);
                return;
              }
              router.push("/order");
            }}
          >
            Оформить заказ
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Cart;
