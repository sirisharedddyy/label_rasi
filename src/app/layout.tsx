import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ProductsProvider } from "../contexts/ProductsContext";
import { OrdersProvider } from "../contexts/OrdersContext";
import { UserProvider } from "../contexts/UserContext";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Label Rasi - Custom Tailoring & Fashion",
  description: "Premium custom tailoring and fashion e-commerce with personalized orders",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <ProductsProvider>
          <OrdersProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </OrdersProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
