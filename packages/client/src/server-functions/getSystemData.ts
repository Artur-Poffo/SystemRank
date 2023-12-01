import { ISystem } from "@/interfaces/ISystem"
import { api } from "@/lib/ky"

export async function getSystemData(systemId: string) {
    const res = await api.get(`systems/${systemId}`, {
      method: 'GET',
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error("Erro ao buscar dados do sistema")
    }

    const system: { system: ISystem } = await res.json()

    return system
}