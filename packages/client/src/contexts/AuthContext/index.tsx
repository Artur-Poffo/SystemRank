'use client'

import { ISignInParams } from "@/interfaces/ISignInParams"
import { ISignUpParams } from "@/interfaces/ISignUpParams"
import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import { decode as decodeJwt } from "jsonwebtoken"
import { useRouter } from "next/navigation"
import { parseCookies, setCookie } from "nookies"
import { registerAuthToken } from "@/utils/registerAuthToken"
import { ReactNode, createContext, useEffect, useState } from "react"

interface AuthContextData {
  isAuthenticated: boolean,
  SignIn: (data: ISignInParams) => Promise<void | { success: boolean, statusCode: number }>,
  SignUp: (data: ISignUpParams) => Promise<void>,
  // UpdateUser: (data: IUser) => Promise<void>,
  user: IUser | null
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const isAuthenticated = !!user

  const router = useRouter()

  useEffect(() => {
    const cookies = parseCookies()

    if (cookies['systems.token']) {
      const jwt = decodeJwt(cookies['systems.token']) as { sub: string }

      getUserData(jwt.sub)
        .then(user => setUser(user))
        .catch(err => console.error("Error on get user data: " + err))
    } else if (cookies['systems.refreshToken']) {
      refreshAuthToken()
        .then()
        .catch(err => console.error(err))
    }
  }, [])

  async function getUserData(userId: string) {
    const res = await api.get(`users/${userId}`, {
      method: 'GET',
    })
    const user: IUser = await res.json()

    return user
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

      router.push('/explore')
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn, SignUp, user }}>
      {children}
    </AuthContext.Provider>
  )
}