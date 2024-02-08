import { Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/provider/Provider";

export const gormorant = Cormorant_Garamond({
  subsets: ["cyrillic"],
  weight: ["500", "400"],
  variable: "--font-gormorant",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-raleway",
});

export const metadata = {
  title: {
    template: "%s | Мир Цветов",
    default: "Мир Цветов",
  },
  description: "Лучший магазин цветов",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={raleway.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
