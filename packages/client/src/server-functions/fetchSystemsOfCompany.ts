import { ISystem } from "@/interfaces/ISystem"
import { api } from "@/lib/ky"

export async function fetchSystemsOfCompany(companyId: string) {
  const res = await api.get(`systems/company/${companyId}`, {
    method: 'GET',
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar sistemas da empresa")
  }

  const { systems }: { systems: ISystem[] } = await res.json()

  return systems
} 