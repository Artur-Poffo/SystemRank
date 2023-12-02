import { ISystem } from "@/interfaces/ISystem"
import { api } from "@/lib/ky"

export async function fetchAllSystems() {
  try {
    const res = await api.get('systems', {
      method: 'GET',
      cache: 'no-store'
    })
  
    const { systems }: { systems: ISystem[] } = await res.json()
  
    return systems
  } catch (err) {
    throw new Error("Erro ao buscar todos os sistemas")
  }
}