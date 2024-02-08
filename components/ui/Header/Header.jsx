"use client";

import Image from "next/image";
import { navLinks } from "@/constants/nav";
import Link from "next/link";
import styled from "./header.module.css";
import { usePathname } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

import Profile from "./Profile/Profile";
import { useRouter } from "next/navigation";
import Burger from "./Burder/Burder";

export default function Header() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const pathname = usePathname();
  const router = useRouter();

  const isRoot = pathname === "/";

  const loading = isLoading;

  return (
    <header className={`${styled.header} ${!isRoot && styled.header_all}`}>
      <nav>
        <ul className={styled.nav}>
          {!isRoot && (
            <li>
              <Link href="/">
                <Image
                  src="/icons/logoLite.svg"
                  alt="logo"
                  width={75}
                  height={100}
                  className={styled.nav__logo}
                />
              </Link>
            </li>
          )}

          {navLinks.map((link, key) => (
            <li key={key} className={styled.nav__links}>
              <Link href={link.href} className={styled.nav__link}>
                {link.label}
              </Link>
            </li>
          ))}

          {isAuthenticated && !loading ? (
            <li>
              {/* <div className={styled.nav__link} onClick={handleLogout}>ВЫЙТИ</div> */}
              <Profile>
                <Image
                  src="/icons/profile.svg"
                  alt="profile"
                  width={47}
                  height={47}
                  className={styled.nav__profile}
                />
              </Profile>
            </li>
          ) : (
            <li>
              {loading ? (
              <div className={styled.nav__loading}>
                Загрузка

              </div>
              ) : (
                <Link href="/login" className={styled.nav__link}>
                  ВОЙТИ
                </Link>
              )}
            </li>
          )}

          {isAuthenticated && (
            <Image
              src="/icons/cart.svg"
              alt="cart"
              width={40}
              height={40}
              onClick={() => router.push("/cart")}
              className={styled.nav__profile}
            />
          )}

          <li className={styled.nav__burger}>
              <Burger>
                <Image
                  src="/icons/menu.svg"
                  alt="menu"
                  width={50}
                  height={30}

                />
              </Burger>
          </li>
        </ul>
      </nav>
    </header>
  );
}
