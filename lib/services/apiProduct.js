import { $apiAuth } from "@/context/AuthContext";

export async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const resFile = await $apiAuth.post(`/photo/uploadPhoto`, formData);

    const dataFile = resFile.data;

    if (!resFile.status === 200) {
      console.log(dataFile.message);
      throw new Error("Something went wrong");
    }

    const imageUrl = dataFile.imageUrl;
    return imageUrl;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteFile(name) {
  const imageName = name.substring(name.lastIndexOf("/") + 1);

  try {
    const res = await $apiAuth.delete(`/photo/deletePhoto/${imageName}`);

    // const data = res.data;

    if (!res.status === 200) {
      throw new Error(res.response.data.message);
    }

    return true;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createProduct(newProduct) {
  try {
    const imageUrl = await uploadFile(newProduct.file[0]);

    const res = await $apiAuth.post(`/products`, {
      name: newProduct.name,
      description: newProduct.desc,
      imageUrl,
      made: newProduct.made,
      price: newProduct.price,
      kind: newProduct.kind,
      type: newProduct.type,
      quantity: newProduct.quantity,
      occasion: newProduct.occasion,
    });

    const data = res.data;

    if (!res.status === 200) {
      deleteFile(imageUrl);
      throw new Error(data?.message);
    }

    const post = data.product;

    return post;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateProduct(product) {
  const hasFileToUpdate = product.file.length > 0;

  try {
    let image = product.imageUrl;

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(product.file[0]);

      if (!uploadedFile) {
        throw Error;
      }

      deleteFile(image);

      image = uploadedFile;
    }

    const res = await $apiAuth.patch(`/products/${product.productId}`, {
      name: product.name,
      description: product.description,
      imageUrl: image,
      made: product.made,
      price: product.price,
      kind: product.kind,
      type: product.type,
      quantity: product.quantity,
      occasion: product.occasion,
    });

    // if (!res.ok) {
    //   // deleteFile(image);
    //   throw new Error(res.data?.message);
    // }

    // const updatedpost = res.data.product;

    return { status: "ok" };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteProduct(productId, imageUrl) {
  try {
    if (!productId) throw Error;

    const res = await $apiAuth.delete(`/products/${productId}`);

    // const data = res.data;

    if (res.data.status !== "success") {
      throw new Error(res.response.data.message);
    }

    await deleteFile(imageUrl);

    return { status: "ok" };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function createLike(productId) {
  try {
    const res = await $apiAuth.post(`/products/like`, {
      productId,
    });

    if (res.data.status !== "ok") {
      throw new Error(res.response.data.message);
    }

    return { status: "ok" };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteLike(productId) {
  try {
    await $apiAuth.delete(`/products/${productId}/unlike`);

    // if (res.data.status !== "ok") {
    //   throw new Error(res.response.data.message);
    // }

    return { status: "ok" };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
