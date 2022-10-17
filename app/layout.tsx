import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  // FIXME is there typing for this?
  children: ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang='en'>
      <head>
        <title>Next.js hello</title>
      </head>
      <body>
        <Link href='/'>Home</Link>

        <main>{props.children}</main>
      </body>
    </html>
  );
}
