import Confirmed from "@/components/screen/pages/confirmed/Confirmed";


export const metadata = {
  title: 'Заказы',
  description: 'Заказы пользователя'
}

function page() {
  return <Confirmed isAdmin={false} />;
}

export default page;
