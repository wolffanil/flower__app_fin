"use client";

import { $api, $apiAuth } from "@/context/AuthContext";

export const getAllComment = async () => {
  try {
    const res = await $api.get("/users/comments");

    const comments = res.data.comments;

    return comments;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createComment = async (text) => {
  try {
    await $apiAuth.patch("/users/create-comment", {
      text,
    });

    return { status: "ok" };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const editComment = async (text) => {
  try {
    await $apiAuth.patch("/users/edit-comment", {
      text,
    });

    return { status: "ok" };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteComment = async () => {
  try {
    await $apiAuth.delete("/users/delete-comment");

    return { status: "ok" };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
