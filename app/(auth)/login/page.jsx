import LoginForm from "@/components/forms/login/LoginForm";


export const metadata = {
  title: 'Войти',
  description: 'Авторизация пользователя',
  alternates: {
    canonical: `${process.env.CLIENT_URL}login`,
  }
}

const page = () => {
  return <LoginForm />;
};

export default page;
