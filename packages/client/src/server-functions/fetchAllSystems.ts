import { ISystem } from "@/interfaces/ISystem"
import { api } from "@/lib/ky"

export async function fetchAllSystems() {
  const res = await api.get('systems', {
    method: 'GET',
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar todos os sistemas")
  }

  const { systems }: { systems: ISystem[] } = await res.json()

  return systems
}