import ky from "ky";
import { parseCookies } from "nookies";

export function generateApi() {
  const {'systems.token': authToken} = parseCookies()

  let api = ky.create({
    prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  })

  if (authToken) {
    api = api.extend({
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
  }

  return api
}