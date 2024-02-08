import { LocateData } from "@/components/screen/pages/Map/LocateData";
import { LocateMap } from "@/components/screen/pages/Map/LocateMap";
import styled from './page.module.css';

export const metadata = {
  title: 'Где нас найти',
  description: 'Расположение магазина мир цветов',
  alternates: {
    canonical: `${process.env.CLIENT_URL}map`,
  }
}

function MapPage() {
  return (
    <div className={styled.map__wrapper}>
      <LocateData />
      <LocateMap />
    </div>
  )
}

export default MapPage;