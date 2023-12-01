import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"

export async function getUserData(userId: string) {
    const res = await api.get(`users/${userId}`, {
      method: 'GET',
      cache: 'no-store'
    })

    if(!res.ok) {
      throw new Error("Erro ao buscar dados do usuário")
    }
    
    const user: { user: IUser } = await res.json()
  
    return user
}