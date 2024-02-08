"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCorrentAccount,
  login,
  logout,
  register,
} from "../services/apiAuth";
import {
  createLike,
  createProduct,
  deleteLike,
  deleteProduct,
  updateProduct,
} from "../services/apiProduct";
import {
  addOne,
  addProduct,
  canceledOrder,
  checkout,
  confirmedCart,
  deleteOrder,
  deleteProduct as deleteProductFromCart,
  getCart,
  getConfirmed,
  getOrdersForAdmin,
  reduce,
} from "../services/apiCart";
import { KEYS } from "./reactQueryKeys";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComment,
} from "../services/apiComment";

export const useSignUpAccount = () => {
  return useMutation({
    mutationFn: (data) => register(data),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (data) => login(data),
  });
};

export const useLogoutAccount = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};

export const useGetCurrentUser = () => {
  return useMutation({
    mutationFn: () => getCorrentAccount(),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: (product) => updateProduct(product),
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: ({ productId, imageUrl }) => deleteProduct(productId, imageUrl),
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, maxQuantity }) =>
      addProduct({ productId, maxQuantity }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
};

export const useDeleteProductFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => deleteProductFromCart(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
};

export const useAddOne = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => addOne(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
};

export const useReduceCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => reduce(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
};

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (geo) => checkout(geo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.CART],
      });
    },
  });
};

export const useGetCart = () => {
  return useQuery({
    queryKey: [KEYS.CART],
    queryFn: () => getCart(),
  });
};

export const useGetComments = () => {
  return useQuery({
    queryKey: [KEYS.COMMENTS],
    queryFn: () => getAllComment(),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => createComment(text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.COMMENTS],
      });
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => editComment(text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.COMMENTS],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.COMMENTS],
      });
    },
  });
};

export const useGetOrders = (isAdmin) => {
  return useQuery({
    queryKey: [KEYS.ORDERS],
    queryFn: () => getConfirmed(isAdmin),
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartId) => deleteOrder(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ORDERS],
      });
    },
  });
};

export const useGetOrdersForAdmin = (isAdmin, status) => {
  return useQuery({
    queryKey: [KEYS.ADMIN_ORDERS],
    queryFn: () => getOrdersForAdmin(status),
    enabled: isAdmin,
  });
};

export const useCanceledOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, cause }) => canceledOrder(cartId, cause),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ORDERS],
      });
    },
  });
};

export const useConfirmedOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId) => confirmedCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ORDERS],
      });
    },
  });
};

export const useCreateLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => createLike(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ORDERS],
      });
    },
  });
};

export const useDeleteLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => deleteLike(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [KEYS.ORDERS],
      });
    },
  });
};
