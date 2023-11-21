'use client'

import { ISignInParams } from "@/interfaces/ISignInParams"
import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import { ReactNode, createContext, useState } from "react"

interface AuthContextData {
    isAuthenticated: boolean,
    SignIn: (data: ISignInParams) => Promise<void>,
    // SignUp: (data: ISignUpParams) => Promise<void>,
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
    
    async function SignIn({ email, password }: ISignInParams) {
      const res = await api.post("/users", {
        method: 'post',
        body: JSON.stringify({email, password})
      })
      console.log(res.body)
    }

    return (
      <AuthContext.Provider value={{ isAuthenticated, SignIn, user }}>
        {children}
      </AuthContext.Provider>
    )
  }