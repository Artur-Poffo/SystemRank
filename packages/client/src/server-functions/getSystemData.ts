import { ISystem } from "@/interfaces/ISystem"
import { api } from "@/lib/ky"
import { notFound } from "next/navigation"

export async function getSystemData(systemId: string) {
  try {
    const res = await api.get(`systems/${systemId}`, {
      method: 'GET',
      cache: 'no-store'
    })

    const system: { system: ISystem } = await res.json()

    return system
  } catch (err) {
    notFound()
  }
}