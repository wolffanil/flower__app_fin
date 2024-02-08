import RegisterForm from "@/components/forms/register/RegisterForm";



export const metadata = {
  title: 'Регистрация',
  description: 'Создать новый аккаунт',
  alternates: {
    canonical: `${process.env.CLIENT_URL}register`,
  }
}

const page = () => {
  return <RegisterForm />;
};

export default page;
