import type { Metadata } from "next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "@/components/common/Provider";
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
      <body>
        <ReduxProvider>
          <MainThemeProvider>
            <MainLayout>{children}</MainLayout>
          </MainThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
