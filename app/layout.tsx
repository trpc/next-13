import Link from "next/link";
import { experimental_use as use, ReactNode } from "react";
import { getUser } from "./_lib/getUser";
import { trpc } from "./_lib/trpc";

interface Props {
  // FIXME is there typing for this?
  children: ReactNode;
}

export default function RootLayout(props: Props) {
  const user = trpc.whoami.use();
  return (
    <html lang='en'>
      <head>
        <title>Next.js hello</title>
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              Logged in as{" "}
              {user ? (
                <>
                  {user.name} - <Link href='/api/auth/signout'>Logout</Link>
                </>
              ) : (
                <>
                  Not logged in - login{" "}
                  <Link href='/api/auth/signin'>Login</Link>
                </>
              )}
            </li>
          </ul>
        </nav>

        <main>{props.children}</main>
      </body>
    </html>
  );
}
