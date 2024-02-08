"use client";

import { useGetOrders } from "@/lib/react-query/reactQueriesAndMutations";
import React, { useEffect, useState } from "react";
import ConfirmedItem from "./ConfirmedItem";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styled from "./confirmed.module.css";

function Confirmed({ isAdmin }) {
  const { data: ordersMY, isPending: isLoadingOrders } = useGetOrders(isAdmin);
  const [filter, setFilter] = useState("");

  // const { data: ordersUser, isPending: isLoadingOrdersUser } =
  //   useGetOrdersForAdmin(isAdmin, "");

  const { user, isLoading, isAuthenticated } = useAuthContext();

  const loading = isLoading || isLoadingOrders;

  const router = useRouter();

  const orders = filter
    ? ordersMY.filter((item) => item.status === filter)
    : ordersMY;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isAdmin && !user.isAdmin && !isLoading) {
      router.push("/");
      return;
    }
  }, [isAuthenticated, isLoading]);

  if (loading) return <div>Загрузка заказов..</div>;

  if (orders?.items?.length) return <div>Заказов нету</div>;

  if (!user) return <></>;

  return (
    <>
      {isAdmin ? (
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styled.confirmed__filter}
        >
          <option
            value=""
            disabled
            selected
            style={{
              display: "none",
            }}
          >
            Выберите статус
          </option>

          <option value="new">Новые</option>
          <option value="confirmed">Подверждённые</option>
          <option value="canceled">Отменённые</option>
        </select>
      ) : (
        ""
      )}

      <div>
        {orders.map((order, key) => (
          <ConfirmedItem
            order={order}
            key={key}
            user={user}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </>
  );
}

export default Confirmed;
