import Cart from "@/components/screen/pages/cart/Cart";

export const metadata = {
  title: "Карзина",
  description: "Карзина для дабавленние товара",
  robots: {
    index: false,
    nocache: true
  }
};

function CartPage() {
  return <Cart />;
}

export default CartPage;
