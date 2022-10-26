
import { ReactNode } from "react";

import { Navbar } from "./navbar";

import "../styles/globals.css";
import { Inter } from '@next/font/google';
const inter = Inter();

interface Props {
  // FIXME is there typing for this?
  children: ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <title>Next.js hello</title>
      </head>
      <body className="bg-gray-700 text-gray-50">
        <Navbar />
        <main>{props.children}</main>
      </body>
    </html>
  );
}
