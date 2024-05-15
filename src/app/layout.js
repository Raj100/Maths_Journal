"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContext } from '@/components/AppContext/AppContext';
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [theme, settheme] = useState("dark");
  return (
    <html lang="en">
      <head>
        <title>Maths Visualiser</title>
        <meta name="description" content="AI Marketing Tool for your Business" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/7.5.1/math.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      </head>
      <AppContext.Provider value={{ theme, settheme }}>
      <body className={inter.className}>{children}</body>
      </AppContext.Provider>

    </html>
  );
}
