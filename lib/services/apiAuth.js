"use client";

import { $api, $apiAuth } from "@/context/AuthContext";

export const register = async (data) => {
  try {
    const res = await $api.post("/auth/register", {
      ...data,
    });

    localStorage.setItem("token", res.data.userData.accessToken);

    return res.data.userData.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const login = async (data) => {
  try {
    const res = await $api.post("/auth/login", {
      ...data,
    });

    localStorage.setItem("token", res.data.userData.accessToken);

    return res.data.userData.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logout = async () => {
  try {
    await $apiAuth.post("/auth/logout");

    return;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCorrentAccount = async () => {
  try {
    const res = await $api.post(`/auth/refresh`);

    localStorage.setItem("token", res.data.userData.accessToken);

    return res.data.userData.user;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
