import { SearchForm } from "@/components/screen/pages/Catalog/SearchForm/SearchForm";
import { SortButton } from "@/components/screen/pages/Catalog/SortButton/SortButton";
import styled from "./catalog.module.css";
import Products from "@/components/screen/pages/Catalog/Products/Products";

export const metadata = {
  title: "Каталог",
  description: "Каталог цветов",
  alternates: {
    canonical: `${process.env.CLIENT_URL}catalog`,
  },
};

async function getPopularFlowers() {
  const api = process.env.API_URL;
  const res = await fetch(`${api}/products`, {
    next: {
      revalidate: 30,
    },
  });

  const data = await res.json();
  return data.products;
}

async function CatalogPage({ searchParams }) {
  let flowers = [];

  if (searchParams.q && searchParams.q?.length > 2) {
    const api = process.env.API_URL;

    const res = await fetch(`${api}/products?q=${searchParams.q}`);

    const data = await res.json();

    flowers = data.products;
  } else if (
    searchParams.kind ||
    searchParams.style ||
    searchParams.country ||
    searchParams.sort
  ) {
    const api2 = process.env.API_URL;

    const kinds = searchParams?.kind
      ? `kind=${searchParams.kind.toLowerCase()}`
      : "";
    const styles = searchParams?.style
      ? `&type=${searchParams.style.toLowerCase()}`
      : "";
    const countrys = searchParams?.country
      ? `&made=${searchParams.country.toLowerCase()}`
      : "";
    const ltes =
      searchParams["price[gte]"]?.length > 0
        ? `&price[gte]=${searchParams["price[gte]"]}`
        : "";
    const gtes =
      searchParams["price[lte]"]?.length > 0
        ? `&price[lte]=${searchParams["price[lte]"]}`
        : "";

    const checks = searchParams?.sort ? `&sort=-likes` : "";

    const res2 = await fetch(
      `${api2}/products?${kinds}${styles}${countrys}${ltes}${gtes}${checks}`,
      {
        cache: "no-cache",
      }
    );

    const data2 = await res2.json();

    flowers = data2.products;
  } else {
    flowers = await getPopularFlowers();
  }

  return (
    <>
      <div className={styled.catalog__elems}>
        <SearchForm />
        <SortButton />
      </div>

      {flowers.length < 1 ? (
        <div>Not found</div>
      ) : (
        <Products flowers={flowers} pathname="catalog" />
      )}
    </>
  );
}

export default CatalogPage;
