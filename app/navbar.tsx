import Link from "next/link";

import { trpc } from "../applib/trpc";
import { RefreshButton } from "./RefreshButton";

export function Navbar() {
  const user = trpc.whoami.use();
  return (
    <nav className="flex flex-1 bg-gray-800 shadow-md shadow-gray-400">
      <ul className="flex py-6 gap-8 mx-auto text-gray-400">
        <li className="hover:text-gray-300">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-gray-300">
          <Link href="/post">Posts</Link>
        </li>

        <li className="hover:text-gray-300">
          <Link href="/secret">Secret page</Link>
        </li>
        <li className="hover:text-gray-300">
          <RefreshButton />
        </li>
        <li className="hover:text-gray-300">
          {user ? (
            <>
              Logged in as {user.name} -{" "}
              <Link href="/api/auth/signout">Logout</Link>
            </>
          ) : (
            <>
              Not logged in - login <Link href="/api/auth/signin">Login</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}
