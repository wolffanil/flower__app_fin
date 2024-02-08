"use client";

import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import styled from "../forms.module.css";
import Link from "next/link";
import { registerValidate } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useSignUpAccount } from "@/lib/react-query/reactQueriesAndMutations";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { errorMessage } from "@/lib/errorMessage";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerValidate),
  });

  const { setUser, setIsAuthenticated, isAuthenticated } = useAuthContext();

  const router = useRouter();

  const { isPending: singUpLoading, mutate: signUp } = useSignUpAccount();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const handleRegister = async (data) => {
    const id = toast.loading("Загрузка...");

    await signUp(data, {
      onSuccess: (user) => {
        toast.success("Вы успешнно зарегестрировались", {
          id,
        });
        setUser(user);
        setIsAuthenticated(true);
        router.push("/");
      },
      onError: (message) => {
        const messageError = errorMessage(message);
        if (messageError === null) return;
        toast.error("Ошибка: " + messageError, {
          id,
        });
      },
    });
  };

  if (isAuthenticated) return;

  return (
    <div>
      <Link href="/">
        <Image
          src="/icons/logoblack.svg"
          alt="logo"
          width={100}
          height={100}
          className={styled.logo}
        />
      </Link>

      <form onSubmit={handleSubmit(handleRegister)} className={styled.form}>
        <h2>Регистрация</h2>

        <input
          type="text"
          {...register("name")}
          className={`${styled.input} ${styled.input_top66px}`}
          placeholder="Имя"
        />
        {errors.name && errors.name.message && (
          <p className={styled.error}>{errors.name.message}</p>
        )}

        <input
          type="text"
          {...register("surname")}
          className={styled.input}
          placeholder="Фамилия"
        />
        {errors.lastname && errors.lastname.message && (
          <p className={styled.error}>{errors.lastname.message}</p>
        )}

        <input
          type="text"
          {...register("patronymic")}
          className={styled.input}
          placeholder="Отчество"
        />

        {errors.patronymic && errors.patronymic.message && (
          <p className={styled.error}>{errors.patronymic.message}</p>
        )}

        <input
          type="email"
          {...register("email")}
          className={styled.input}
          placeholder="Email"
        />

        {errors.email && errors.email.message && (
          <p className={styled.error}>{errors.email.message}</p>
        )}

        <input
          type="text"
          {...register("login")}
          className={styled.input}
          placeholder="Логин"
        />

        {errors.login && errors.login.message && (
          <p className={styled.error}>{errors.login.message}</p>
        )}

        <input
          type="password"
          {...register("password")}
          className={styled.input}
          placeholder="Пароль"
        />

        {errors.password && errors.password.message && (
          <p className={styled.error}>{errors.password.message}</p>
        )}

        <input
          type="password"
          {...register("confirmPassword")}
          className={styled.input}
          placeholder="Павторить пароль"
        />

        {errors.confirmPassword && errors.confirmPassword.message && (
          <p className={styled.error}>{errors.confirmPassword.message}</p>
        )}

        <div className={styled.wrapper}>
          <input
            type="checkbox"
            className={styled.wrapper__checkbox}
            required
          />

          <p className={styled.wrapper__desc}>
            Регистрируясь вы даёте согласие на обработку ваших  
            <a
              href="https://astrahan.rus-buket.ru/public/personal-data-ru.pdf"
              className={styled.wrapper__link}
            >
              персональных данных
            </a>
          </p>
        </div>

        <Button
          style="55px"
          paddingx="20px"
          disapled={singUpLoading || isAuthenticated}
        >
          {singUpLoading ? "Загрузка..." : "Зарегистрироваться"}
        </Button>

        {/* <button type="submit">{singUpLoading ? "Загрузка..." : 'Зарегистрироваться' }</button> */}

        <Link href="/login" className={styled.link}>
          Войти
        </Link>
      </form>
    </div>
  );
};

export default RegisterForm;
