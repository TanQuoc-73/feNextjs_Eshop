import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "E-Shop - Online Tech Store",
  description: "Shop premium tech gadgets and electronics online at E-Shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow mt-3 pt-16 flex flex-col items-center justify-center bg-gray-900">
              {children}
            </main>
            <div className="w-full">
              <Footer />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
