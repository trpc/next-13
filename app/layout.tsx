import Link from "next/link";
import { ReactNode } from "react";
import { ClientProvider } from "~/client/trpcClient";
import { rsc } from "../server-rsc/trpc";

interface Props {
  // FIXME is there typing for this?
  children: ReactNode;
}

export default function RootLayout(props: Props) {
  const user = rsc.whoami.use();
  return (
    <ClientProvider>
      <html lang='en'>
        <head>
          <title>Next.js hello</title>
        </head>
        <body>
          <nav className='p-4'>
            <ul className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-2 justify-center items-center'>
              <li>
                <Link href='/' className='text-indigo-500 underline'>
                  Home
                </Link>
              </li>
              <li>
                <Link href='/secret' className='text-indigo-500 underline'>
                  Secret page
                </Link>
              </li>
              <li>
                {user ? (
                  <>
                    Hi {user.name}
                    <Link href='/api/auth/signout' className='Logout'>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href='/api/auth/signin' className='button'>
                      Login
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </nav>

          <main>{props.children}</main>
        </body>
      </html>
    </ClientProvider>
  );
}
