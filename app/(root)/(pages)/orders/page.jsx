import Confirmed from "@/components/screen/pages/confirmed/Confirmed";


export const metadata = {
  title: 'Заказы',
  description: 'Редактирование заказов',
  robots: {
    index: false,
    nocache: true
  }
}

function page() {
  return <Confirmed isAdmin={true} />;
}

export default page;
