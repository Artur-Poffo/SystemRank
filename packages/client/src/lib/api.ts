import ky from "ky";
import { parseCookies } from "nookies";

export function generateApi() {
  const {'systems.token': authToken} = parseCookies()

  let api = ky.create({
    prefixUrl: 'http://localhost:3333',
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