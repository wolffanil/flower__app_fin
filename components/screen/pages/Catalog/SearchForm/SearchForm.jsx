"use client";

import Image from "next/image";
import styled from "./SearchForm.module.css";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export const SearchForm = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const dalayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/catalog?q=` + search);
      } else {
        router.push(`/catalog`);
      }
    }, 300);

    return () => clearTimeout(dalayDebounceFn);
  }, [search]);

  const handleSearch = () => {
    router.push(`/catalog?q=` + search);
  };

  return (
    <div className={styled.search__wrapper}>
      <input
        type="text"
        className={styled.search__input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className={styled.search__button} onClick={handleSearch}>
        <Image src="/icons/search.svg" alt="search" width={39} height={39} className={styled.search__icon} />
      </button>
    </div>
  );
};
