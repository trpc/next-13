import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  name: string;
}
export async function getUser(): Promise<User | null> {
  const $cookies = cookies();

  const newCookies = new Map<string, string>();
  for (const [key, value] of $cookies.entries()) {
    newCookies.set(key, value.substr(key.length + 1).split(";")[0]);
  }

  const token = await getToken({
    req: {
      cookies: newCookies as any,
      headers: {},
    } as any,
  });
  if (!token || !token.name || !token.email || !token.sub) {
    return null;
  }
  return {
    id: token.sub,
    name: token.name,
    email: token.email,
  };
}
