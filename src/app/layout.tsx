'use client'

import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html suppressHydrationWarning lang="en" id="html" data-theme="dark">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
} 
