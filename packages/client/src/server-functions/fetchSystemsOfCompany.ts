import { ISystem } from "@/interfaces/ISystem"
import { api } from "@/lib/ky"

export async function fetchSystemsOfCompany(companyId: string) {
  try {
    const res = await api.get(`systems/company/${companyId}`, {
      method: 'GET',
      cache: 'no-store'
    })
  
    const { systems }: { systems: ISystem[] } = await res.json()
  
    return systems
  } catch (err) {
    throw new Error("Erro ao buscar sistemas da empresa")
  }
} 