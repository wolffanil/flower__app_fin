import { $apiAuth } from "@/context/AuthContext";

export const addProduct = async ({ productId, maxQuantity }) => {
  try {
    const res = await $apiAuth.post("/carts", {
      productId,
      maxQuantity,
    });

    const data = res.data.cart;

    console.log(res, "res");

    if (!data) {
      throw new Error("Что то пошло не так");
    }

    return data;
  } catch (error) {
    console.log(error, "ERROR");
    throw new Error(error.response.data.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const res = await $apiAuth.delete(`/carts/${productId}`);

    // const data = res.data.cart;

    // if (!data) {
    //   throw new Error("Что то пошло не так");
    // }

    // return data;
    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addOne = async (productId) => {
  try {
    const res = await $apiAuth.patch("/carts/add-one", {
      productId,
    });

    const data = res.data.cart;

    if (!data) {
      throw new Error("Что то пошло не так");
    }

    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const reduce = async (productId) => {
  try {
    const res = await $apiAuth.patch("/carts/reduce", {
      productId,
    });

    const data = res.data.cart;

    if (!data) {
      throw new Error("Что то пошло не так");
    }

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const checkout = async (geo) => {
  try {
    const res = await $apiAuth.post("/carts/checkout", {
      ...geo,
    });

    const data = res.data.cart;

    if (!data) {
      throw new Error("Что то пошло не так");
    }

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCart = async () => {
  try {
    const res = await $apiAuth.get("/carts");

    const data = res.data.cart;

    if (!data) {
      throw new Error("Что то пошло не так");
    }

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getConfirmed = async (isAdmin) => {
  try {
    const res = await $apiAuth.get(
      `/carts/confirmed/${isAdmin ? "admin" : "user"}`
    );

    const data = res.data.carts;

    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteOrder = async (cartId) => {
  try {
    const res = await $apiAuth.delete(`/carts/delete-cart/${cartId}`);

    // const status = res.data.status;

    // console.log(res, "RES");

    // console.log(status);
    // if (status !== "success") {
    //   throw new Error("Error: что-то пошло нет так");
    // }

    return "success";
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const canceledOrder = async (cartId, cause) => {
  try {
    const res = await $apiAuth.patch(`/carts/canceled-cart/${cartId}`, {
      cause,
    });

    // const status = res.data.status;

    // if (status !== true) {
    //   throw new Error("Error: что-то пошло нет так");
    // }

    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const confirmedCart = async (cartId) => {
  try {
    console.log(cartId, "ID");

    const res = await $apiAuth.patch(`/carts/confirmed-cart/${cartId}`);

    // const status = res.data.status;

    // if (status !== true) {
    //   throw new Error("Error: что-то пошло нет так");
    // }

    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getOrdersForAdmin = async (status) => {
  console.log(status, "status");
  try {
    const res = await $apiAuth.get(
      `/carts/admin?status=${status ? status : ""}`
    );

    const carts = res.data.carts;

    return carts;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
