'use client'

import { ISignInParams } from "@/interfaces/ISignInParams"
import { ISignUpParams } from "@/interfaces/ISignUpParams"
import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import { registerAuthToken } from "@/utils/registerAuthToken"
import { decode as decodeJwt } from "jsonwebtoken"
import { useRouter } from "next/navigation"
import { destroyCookie, parseCookies } from "nookies"
import { ReactNode, createContext, useEffect, useState } from "react"

interface AuthContextData {
  isAuthenticated: boolean,
  SignIn: (data: ISignInParams) => Promise<void | { success: boolean, statusCode: number }>,
  SignUp: (data: ISignUpParams) => Promise<void>,
  Logout: () => Promise<void>,
  // UpdateUser: (data: IUser) => Promise<void>,
  user: IUser | null
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [userData, setUserData] = useState<IUser | null>(null)
  const isAuthenticated = !!userData

  const router = useRouter()

  useEffect(() => {
    const cookies = parseCookies()

    if (cookies['systems.token']) {
      const jwt = decodeJwt(cookies['systems.token']) as { sub: string }

      getUserData(jwt.sub)
        .then(data => setUserData(data.user))
        .catch(err => console.error("Error on get user data: " + err))
    } else if (cookies['systems.refreshToken']) {
      refreshAuthToken()
        .catch((err) => console.error("Error on refresh token: ", err))
    }
  }, [])

  async function getUserData(userId: string) {
    const res = await api.get(`users/${userId}`, {
      method: 'GET',
    })
    const data: { user: IUser } = await res.json()

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

    registerAuthToken(token)
    router.refresh()
  }

  async function SignIn({ email, password }: ISignInParams) {
    try {
      const res = await api.post("sessions", {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      const { token }: { token: string } = await res.json()

      registerAuthToken(token)

      router.back()
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
    destroyCookie(null, 'systems.token')
    destroyCookie(null, 'systems.refreshToken')

    router.refresh()
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn, SignUp, Logout, user: userData }}>
      {children}
    </AuthContext.Provider>
  )
}