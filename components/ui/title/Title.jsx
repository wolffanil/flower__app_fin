"use client"

import { usePathname } from 'next/navigation';
import styled from './title.module.css';
import { titleLinks } from '@/constants/titlelink';


function Title() {
    const pathname = usePathname();

  return (
    <>
        <h2 className={styled.title__text}>{titleLinks[pathname]?.length > 0 ? titleLinks[pathname] : "О ТОВАРЕ"}</h2>
    </>
  )
}

export default Title