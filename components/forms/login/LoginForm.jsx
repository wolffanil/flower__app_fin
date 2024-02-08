"use client";

import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import styled from "../forms.module.css";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidate } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/reactQueriesAndMutations";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import Image from "next/image";
import { errorMessage } from "@/lib/errorMessage";

const LoginForm = () => {
  const { setUser, setIsAuthenticated, isAuthenticated } = useAuthContext();
  const { isPending: isLoadingSignIn, mutate: signIn } = useSignInAccount();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginValidate),
  });

  const handleLogin = async (data) => {
    const id = toast.loading("Загрузка...");

    await signIn(data, {
      onSuccess: (user) => {
        toast.success(`Добро пожаловать обратно ${user.name}`, {
          id,
        });

        setUser({
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          isAdmin: user.role == "admin",
          patronymic: user.patronymic,
          comment: user?.comment ? user.comment : ''
        });
        setIsAuthenticated(true);
        router.push("/");
      },
      onError: (error) => {
        console.log(error, "ERRORR");
        const messageError = errorMessage(error);
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

      <form onSubmit={handleSubmit(handleLogin)} className={styled.form}>
        <h2>Авторизация</h2>

        <input
          type="text"
          {...register("login")}
          className={`${styled.input} ${styled.input_top66px}`}
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
        <Button style="12px" disapled={isLoadingSignIn || isAuthenticated}>
          {isLoadingSignIn ? "Загрузка..." : "Войти"}
        </Button>

        <Link href="/register" className={styled.link}>
          Зарегистрироваться
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
