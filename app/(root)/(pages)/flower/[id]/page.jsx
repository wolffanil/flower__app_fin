import Product from "@/components/screen/pages/product/Product";
import { cache } from "react";

const getProduct = cache(async (id) => {
  const api = process.env.API_URL;

  const res = await fetch(`${api}/products/${id}`, {
    next: {
      revalidate: 30,
    },
  });

  const data = await res.json();

  return data;

})

export async function generateMetadata({ params }) {
 const data = await getProduct(params.id);

  if (!data.product) {
    return {
      title: "Not Found",
      description: "the product not found",
    };
  }

  return {
    title: data.product.name,
    description: data.product.description,
    alternates: {
      canonical: `${process.env.CLIENT_URL}flower/${data.product._id}`,
    }
  };
}

async function page({ params }) {
  const data = await getProduct(params.id);

  if (!params.id) return <div>Not Found</div>;

  return (
    <>
      <Product product={data.product} />
    </>
  );
}

export default page;
