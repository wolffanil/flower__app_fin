"use client";

import { orderValidate } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styled from "../forms.module.css";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  useCheckout,
  useGetCart,
} from "@/lib/react-query/reactQueriesAndMutations";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { errorMessage } from "@/lib/errorMessage";

import "react-phone-input-2/lib/style.css";

function Order() {
  const { user, isLoading } = useAuthContext();

  const router = useRouter();
  const { data: cart, isPending: isLoadingCart } = useGetCart();

  useEffect(() => {
    if (isLoading || isLoadingCart) return;

    if (!user || !cart?.items?.length) {
      // toast.error("Ваша карзина пуста");
      router.push("/cart");
    }
  }, [isLoading, user, cart, isLoadingCart]);

  const { isPending: isCheckout, mutate: checkout } = useCheckout();

  const loading = isLoadingCart || isLoading || isCheckout;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(orderValidate),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const handleOrder = async (data) => {
    const id = toast.loading("Отправка заказа...");

    await checkout(data, {
      onSuccess: (data) => {
        reset();
        toast.success("Заказ успешно оформленн", { id });
        router.push("/confirmed");
        // data.items.forEach((item) => {
        //   revalidateTag(`/flower/${item.product._id}`);
        // });
      },

      onError: (message) => {
        const messageError = errorMessage(message);

        if (messageError === null) return;

        toast.error(`Ошибка ${messageError}`, { id });
      },
    });
  };

  return (
    <form
      className={`${styled.form} ${styled.form__order}`}
      onSubmit={handleSubmit(handleOrder)}
    >
      <h3 className={styled.form__order_subtitle}>Получатель</h3>

      {/* <div>
        <input type="checkbox" required />я сам(-а) получу заказ
      </div> */}

      <input
        type="text"
        {...register("name")}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Имя"
      />
      {errors.name && errors.name.message && (
        <p className={styled.error}>{errors.name.message}</p>
      )}
      <input
        type="tel"
        {...register("phone")}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Номер телефона"
      />
      {/* <PhoneInput
        // {...register("phone")}
        onlyCountries={["ru"]}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Номер Телефона"
        country="Ru | 1"
        inputProps={{ ...register("phone") }}
      /> */}

      {errors.phone && errors.phone.message && (
        <p className={styled.error}>{errors.phone.message}</p>
      )}
      <input
        type="email"
        {...register("email")}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Email"
      />
      {errors.email && errors.email.message && (
        <p className={styled.error}>{errors.email.message}</p>
      )}

      <p className={styled.form__order_subtitle}>Дата и время</p>

      <input
        type="date"
        {...register("date")}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Дата"
      />
      {errors.date && errors.date.message && (
        <p className={styled.error}>{errors.date.message}</p>
      )}
      <input
        type="time"
        {...register("time")}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Время"
      />
      {errors.time && errors.time.message && (
        <p className={styled.error}>{errors.time.message}</p>
      )}

      <p className={styled.form__order_subtitle}>Адреc</p>

      <input
        type="text"
        {...register("address")}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Aдрес"
      />
      {errors.address && errors.address.message && (
        <p className={styled.error}>{errors.address.message}</p>
      )}

      <input
        type="password"
        {...register("password")}
        className={`${styled.input} ${styled.form__order_input}`}
        placeholder="Пароль"
      />
      {errors.password && errors.password.message && (
        <p className={styled.error}>{errors.password.message}</p>
      )}

      <div className={styled.wrapper}>
        <input type="checkbox" className={styled.wrapper__checkbox} required />

        <p className={styled.wrapper__desc}>
          Оформляя заказ вы даёте согласие на обработку ваших  
          <a
            href="https://astrahan.rus-buket.ru/public/personal-data-ru.pdf"
            className={styled.wrapper__link}
          >
            персональных данных
          </a>
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={styled.form__order_button}
      >
        ОФОРМИТЬ ЗАКАЗ
      </button>
    </form>
  );
}

export default Order;
