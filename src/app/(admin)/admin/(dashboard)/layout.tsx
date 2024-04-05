import type { Metadata } from "next";
import "@styles/globals.css";

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
    <div>
      <p>Test</p>
      {children}
    </div>
  );
}
