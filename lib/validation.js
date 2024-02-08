import * as z from "zod";

export const loginValidate = z.object({
  login: z
    .string()
    .min(4, { message: "логин не может составлять меньше 4 символов" }),
  password: z
    .string()
    .min(6, { message: "Слишком кароткий пароль" })
    .max(20, { message: "Превышенна длина пароля" }),
});

export const registerValidate = z
  .object({
    name: z
      .string()
      .min(2, { message: "Минимальная длинна имени - 2 символа" })
      .max(20, { message: "Привышена длина имени(20)" }),
    surname: z
      .string()
      .min(1, { message: "Минимальная длинна фамилии - 1 символ" })
      .max(20, { message: "Привышена длина фамилии(20)" }),
    patronymic: z
      .string()
      .min(4, { message: "Минимальная длинна отчества - 4 символ" })
      .max(20, { message: "Привышена длина фамилии(20)" }),
    email: z
      .string()
      .email({ message: "Введите коректный адрес электронной почты" }),
    login: z
      .string()
      .min(4, { message: "Минимальная длинна отчества - 4 символ" }),
    password: z
      .string()
      .min(6, { message: "Слишком кароткий пароль" })
      .max(20, { message: "Превышенна длина пароля" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const addProductValidate = z.object({
  name: z
    .string()
    .min(3, { message: "название цветов должно быть мин 3 символа" }),
  description: z
    .string()
    .trim()
    .min(20, { message: "Описание должно составлять мин 20 символов" }),
  type: z.custom(),
  made: z.custom(),
  price: z
    .number()
    .gte(50, { message: "Цена должна составлять мин 50 рублей" }),
  file: z.custom(),
  occasion: z.string().min(4, { message: "Повод должен быть мин 4 символа" }),
  kind: z.custom(),
  quantity: z.number().gte(1, { message: "Кол-во должно быть мин 1" }),
});

export const orderValidate = z.object({
  name: z
    .string()
    .min(2, { message: "Минимальная длинна имени - 2 символа" })
    .max(20, { message: "Привышена длина имени(20)" }),

  phone: z.custom(),
  email: z
    .string()
    .email({ message: "Введите коректный адрес электронной почты" }),
  address: z
    .string()
    .min(10, { message: "адресс должен состоять мин 10 символов" }),
  date: z.custom(),
  time: z.custom(),
  password: z
    .string()
    .min(6, { message: "Слишком кароткий пароль" })
    .max(20, { message: "Превышенна длина пароля" }),
});
