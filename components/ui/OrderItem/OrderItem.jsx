import { useAuthContext } from "@/context/AuthContext";

function OrderItem({ cart }) {
  const { user } = useAuthContext();

  return (
    <div>
      <article>
        <p>Имя</p>
        <p>{user.name}</p>
      </article>
    </div>
  );
}

export default OrderItem;
