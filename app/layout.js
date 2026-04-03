import { Bitter, Manrope } from "next/font/google";
import styles from "./layout.module.css";

const displayFont = Bitter({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "800"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata = {
  title: "Logistics Order Form",
  description: "Design-first logistics order form with live shipment preview."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={styles.html}>
      <body className={`${displayFont.variable} ${bodyFont.variable} ${styles.body}`}>
        {children}
      </body>
    </html>
  );
}
