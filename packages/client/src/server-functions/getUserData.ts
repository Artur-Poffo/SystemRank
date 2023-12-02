import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import { notFound } from "next/navigation"

export async function getUserData(userId: string) {
  try {
    const res = await api.get(`users/${userId}`, {
      method: 'GET',
      cache: 'no-store'
    })

    const user: { user: IUser } = await res.json()

    return user
  } catch (err) {
    notFound()
  }
}