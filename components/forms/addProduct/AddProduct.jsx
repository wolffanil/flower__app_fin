"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductValidate } from "@/lib/validation";
import styled from "../forms.module.css";
import toast from "react-hot-toast";
import FileUploader from "../FileUpload/FileUplaod";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/lib/react-query/reactQueriesAndMutations";
import { useRouter } from "next/navigation";
import { errorMessage } from "@/lib/errorMessage";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";

const optionsKind = [
  { value: "розы", label: "Розы" },
  { value: "тюльпаны", label: "Тюльпаны" },
  { value: "васелёк", label: "Васелёк" },
  { value: "хризантемы", label: "Хризантемы" },
  { value: "лилия", label: "Лилия" },
  { value: "cухоцветы", label: "Сухоцветы" },
];

const optionsStyle = [
  { value: "нежний", label: "Нежный" },
  { value: "жёлтый", label: "Жёлтый" },
  { value: "красный", label: "Красный" },
  { value: "синий", label: "Синий" },
  { value: "розовый", label: "Розовый" },
];

const optionsCountries = [
  { value: "китай", label: "Китай" },
  { value: "голандия", label: "Голандия" },
  { value: "россия", label: "Россия" },
  { value: "англия", label: "Англия" },
];

function AddProduct() {
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Обращение к localStorage

  //     const flower = localStorage.key("flower")
  //       ? JSON.parse(localStorage.getItem("flower"))
  //       : "";

  //     const action = flower ? "update" : "create";
  //     setAction(action);
  //     setFlower(flower);
  //   }
  // }, []);
  let flower = [];
  let action = "create";

  if (typeof window !== "undefined") {
    flower = localStorage.key("flower")
      ? JSON.parse(localStorage.getItem("flower"))
      : "";

    action = flower ? "update" : "create";
  }

  const { isPending: isCreateProduct, mutate: createProduct } =
    useCreateProduct();

  const { isPending: isUpdateProduct, mutate: updateProduct } =
    useUpdateProduct();

  const router = useRouter();

  const { user, isLaoading: isAuthLoading } = useAuthContext();

  const isLaoading = isUpdateProduct || isCreateProduct;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(addProductValidate),
    defaultValues: {
      name: flower ? flower.name : "",
      description: flower ? flower.description : "",
      file: [],
      kind: flower ? flower.kind : "",
      type: flower ? flower.type : "",
      price: flower ? flower.price : 0,
      occasion: flower ? flower.occasion : "",
      made: flower ? flower.made : "",
      quantity: flower ? flower.quantity : 0,
    },
  });

  useEffect(() => {
    if (isAuthLoading) return;

    if (!user || !user?.isAdmin) {
      router.push("/");
    }
  }, [isAuthLoading, user]);

  const handleAddFlower = async (product) => {
    const id = toast.loading("Загрузка...");

    if (flower && action === "update") {
      await updateProduct(
        {
          ...product,
          productId: flower._id,
          imageUrl: flower?.imageUrl,
        },
        {
          onSuccess: () => {
            // toast.success("Товар был успешнно обновлённ", {
            //   id,
            // });
            // reset();
            // router.push("/");
            // localStorage.removeItem("flower");
            // return;
          },

          onError: (message) => {
            const messageError = errorMessage(message);
            if (messageError === null) return;

            toast.error(`Ошибка: ${messageError}`, { id });
            return;
          },
        }
      );

      toast.success("Товар был успено обновлён", {
        id,
      });
      reset();
      router.push("/");
      localStorage.removeItem("flower");

      return;
    } else {
      if (action !== "create") return;
      await createProduct(
        {
          ...product,
        },
        {
          onSuccess: () => {
            reset();
            setValue("file", []);
          },
          onError: (message) => {
            const messageError = errorMessage(message);
            if (messageError === null) return;

            toast.error(`Ошибка: ${messageError}`, { id });
            return;
          },
        }
      );

      toast.success("Товар успешно создан", { id });
    }

    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddFlower)}
      className={`${styled.form} ${styled.form__mt66} ${styled.form__admin}`}
    >
      <input
        type="text"
        {...register("name")}
        className={`${styled.input} ${styled.input__admin}`}
        placeholder="Название"
      />
      {errors.name && errors.name.message && (
        <p className={styled.form__error_admin}>{errors.name.message}</p>
      )}

      <textarea
        type="text"
        {...register("description")}
        className={`${styled.input} ${styled.input__admin}`}
        placeholder="Описание"
      ></textarea>
      {errors.description && errors.description.message && (
        <p className={styled.form__error_admin}>{errors.description.message}</p>
      )}

      {/* <Select
        {...register("kind")}
        options={optionsKind}
        defaultValue={
          flower && flower.kind !== undefined
            ? optionsKind.find((option) => option.value === flower.kind) || ""
            : ""
        }
        placeholder="Вид цветов"
        isClearable={isClearable}
        styles={colourStyles}
        className={styled.form__select}
      /> */}

      <select
        {...register("kind")}
        className={styled.form__select}
        defaultValue={
          flower && flower.kind !== undefined
            ? optionsKind.find((option) => option.value === flower.kind) || ""
            : ""
        }
      >
        {optionsKind.map((k, key) => (
          <option value={k.value} key={key}>
            {k.label}
          </option>
        ))}

        <option
          value=""
          disabled
          selected
          style={{
            display: "none",
          }}
        >
          Выберите вид
        </option>
      </select>

      {errors.kind && errors.kind.message && (
        <p className={styled.form__error_admin}>{errors.kind.message}</p>
      )}

      <select
        {...register("made")}
        className={styled.form__select}
        defaultValue={
          flower && flower.made !== undefined
            ? optionsCountries.find((option) => option.value === flower.made) ||
              ""
            : ""
        }
      >
        {optionsCountries.map((k, key) => (
          <option value={k.value} key={key}>
            {k.label}
          </option>
        ))}
        <option
          value=""
          disabled
          selected
          style={{
            display: "none",
          }}
        >
          Выберите страну
        </option>
      </select>

      {errors.made && errors.made.message && (
        <p className={styled.form__error_admin}>{errors.made.message}</p>
      )}

      <select
        {...register("type")}
        className={styled.form__select}
        defaultValue={
          flower && flower.type !== undefined
            ? optionsStyle.find((option) => option.value === flower.type) || ""
            : ""
        }
      >
        {optionsStyle.map((k, key) => (
          <option value={k.value} key={key}>
            {k.label}
          </option>
        ))}
        <option
          value=""
          disabled
          selected
          style={{
            display: "none",
          }}
        >
          Выберите стиль
        </option>
      </select>

      {errors.type && errors.type.message && (
        <p className={styled.form__error_admin}>{errors.type.message}</p>
      )}

      <input
        type="text"
        {...register("occasion")}
        className={`${styled.input} ${styled.input__admin}`}
        placeholder="Повод"
      />
      {errors.occasion && errors.occasion.message && (
        <p className={styled.form__error_admin}>{errors.occasion.message}</p>
      )}

      <input
        type="number"
        {...register("price", { valueAsNumber: true })}
        className={`${styled.input} ${styled.input__admin}`}
        placeholder="Цена"
      />
      {errors.price && errors.price.message && (
        <p className={styled.form__error_admin}>{errors.price.message}</p>
      )}

      <input
        type="number"
        {...register("quantity", { valueAsNumber: true })}
        className={`${styled.input} ${styled.input__admin}`}
        placeholder="Количестов товара"
      />
      {errors.quantity && errors.quantity.message && (
        <p className={styled.form__error_admin}>{errors.quantity.message}</p>
      )}

      <FileUploader
        fieldChange={(file) => setValue("file", file)}
        mediaUrl={flower?.imageUrl}
      />

      {errors.file && errors.file.message && (
        <p className={styled.form__error_admin}>{errors.file.message}</p>
      )}

      <button
        type="submit"
        className={styled.form__admin_button}
        disabled={isLaoading}
      >
        {action === "create" ? "Дабавить" : "Редактировать"}
      </button>
    </form>
  );
}

export default AddProduct;
