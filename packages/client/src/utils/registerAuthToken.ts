import { setCookie } from "nookies";

export async function registerAuthToken(token: string) {
  const authToken = setCookie(null, 'systems.token', token, {
    maxAge: 3600, // 1 hour
    path: '/',
  })
  
  return authToken
}