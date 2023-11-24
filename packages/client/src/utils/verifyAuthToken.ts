import { cookies } from "next/headers";

export async function verifyAuthToken() {
  "use server"

  const authToken = cookies().get('systems.token');
  return {cookie: authToken, hasCookie: authToken ? true : false}
}