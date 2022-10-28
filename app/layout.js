// This is `.jsx` b/c of https://github.com/vercel/next.js/discussions/41745#discussioncomment-3992326
import React from "react";
import Link from "next/link";
import { ClientProvider } from "../client/trpcClient";
import { rsc } from "../server-rsc/trpc";

// interface Props {
//   // FIXME is there typing for this?
//   children: ReactNode;
// }
export const config = {
  runtime: 'experimental-edge', // for Edge API Routes only
}
export default function RootLayout(props) {
  const user = rsc.whoami.use();
  return (
    <ClientProvider>
      <html lang='en'>
        <head>
          <title>Next.js hello</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
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
                    Hi <em>{user.name}</em>.{" "}
                    <Link href='/api/auth/signout' className='underline'>
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
