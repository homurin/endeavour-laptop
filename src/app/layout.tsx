import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ReactProvider from "./Provider";
import MainLayout from "@/components/layout/MainLayout";
import MainThemeProvider from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Endeavour Laptop",
  description: "Laptop Recommender Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactProvider>
          <MainThemeProvider>
            <MainLayout>{children}</MainLayout>
          </MainThemeProvider>
        </ReactProvider>
      </body>
    </html>
  );
}
