import { cookies } from "next/headers";

export async function verifyAuthToken() {
  "use server"

  const hasCookie = cookies().has('systems.token');
  return hasCookie ? true : false
}