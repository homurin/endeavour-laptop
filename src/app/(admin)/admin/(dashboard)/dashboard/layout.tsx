import type { Metadata } from "next";
import "@styles/globals.css";
import ReduxProvider from "@components/common/Provider";
import ProtectedLayout from "@/components/dashboard/ProtectedLayout";
import MainThemeProvider from "@/components/dashboard/MainThemeProvider";
import DashboardLayout from "@/components/layout/DashboardLayout";

export const metadata: Metadata = {
  title: "Admin Dashboard",
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
          <ProtectedLayout>
            <MainThemeProvider>
              <DashboardLayout>{children}</DashboardLayout>
            </MainThemeProvider>
          </ProtectedLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
