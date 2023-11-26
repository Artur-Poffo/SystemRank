'use client'

import { ISignInParams } from "@/interfaces/ISignInParams"
import { ISignUpParams } from "@/interfaces/ISignUpParams"
import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import { decode as decodeJwt } from "jsonwebtoken"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { useRouter } from "next/navigation"
import { ReactNode, createContext, useEffect, useState } from "react"

interface AuthContextData {
  SignIn: (data: ISignInParams) => Promise<void>,
  SignUp: (data: ISignUpParams) => Promise<void>,
  GetUserData: (userId: string) => Promise<{ user: IUser | null }>
  Logout: () => Promise<void>,
  // UpdateUser: (data: IUser) => Promise<void>,
  user: IUser | null
  isAuthenticated: boolean
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<IUser | null>(null)
  const [cookies, setCookies] = useState<RequestCookie[]>([])

  const isAuthenticated = !!userData

  const router = useRouter()

  useEffect(() => {
    api.get('/api/auth/cookies/getAll', {
      prefixUrl: undefined,
      method: 'GET',
      cache: 'no-store'
    })
      .then(res => res.json() as unknown as { allCookies: RequestCookie[] })
      .then(data => setCookies(data.allCookies))
      .catch(err => console.error('Erro na busca pelos cookies: ', err))
  }, [])

  useEffect(() => {
    const authToken = cookies.find(cookie => cookie.name === "systems.token");
    const refreshToken = cookies.find(cookie => cookie.name === "systems.refreshToken");

    if (authToken) {
      const jwt = decodeJwt(authToken.value) as { sub: string };

      getUserData(jwt.sub)
        .then(userData => setUserData(userData.user))
        .catch(err => console.error("Error on get user data: " + err));
    } else if (refreshToken) {
      refreshAuthToken()
        .catch((err) => console.error("Error on refresh token: ", err));
    }
  }, [cookies]);

  async function getUserData(userId: string) {
    const res = await api.get(`users/${userId}`, {
      method: 'GET',
      cache: 'no-store'
    })
    const data: { user: IUser | null } = await res.json()

    return data
  }

  async function refreshAuthToken() {
    const res = await api.patch('token/refresh', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": "0",
      }
    })
    const { token }: { token: string } = await res.json()

    await api.post('/api/auth/cookies/register', {
      prefixUrl: undefined,
      method: 'POST',
      body: JSON.stringify({ name: 'systems.token', value: token }),
    })

    await router.refresh()
  }

  async function SignIn({ email, password }: ISignInParams) {
    try {
      const res = await api.post("sessions", {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      const { token }: { token: string } = await res.json()

      await api.post('/api/auth/cookies/register', {
        prefixUrl: undefined,
        method: 'POST',
        body: JSON.stringify({ name: 'systems.token', value: token }),
      })

      await router.push('/explore')
    } catch (err) {
      console.error('Erro durante a autenticação: ', err);
      throw err;
    }
  }

  async function SignUp(data: ISignUpParams) {
    try {
      await api.post('users', {
        method: 'POST',
        body: JSON.stringify(data)
      })

      await SignIn({ email: data.email, password: data.password })
    } catch (err) {
      console.error('Erro durante o cadastro: ', err);
      throw err;
    }
  }

  async function Logout() {
    await api.delete('/api/auth/cookies/destroy', {
      prefixUrl: undefined,
      method: 'DELETE',
    })

    router.refresh()
  }

  return (
    <AuthContext.Provider value={{ SignIn, SignUp, Logout, GetUserData: getUserData, user: userData, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}