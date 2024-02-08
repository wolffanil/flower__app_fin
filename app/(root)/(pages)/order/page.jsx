import Order from "@/components/forms/order/Order";


export const metadata = {
  title: 'Оформление',
  description: 'Оформить заказ',
  robots: {
    index: false,
    nocache: true
  }
}

function OrderPage() {
  return <Order />;
}

export default OrderPage;
