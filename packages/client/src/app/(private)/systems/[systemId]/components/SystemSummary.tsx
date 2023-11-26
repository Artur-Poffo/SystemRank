import { ISystem } from "@/interfaces/ISystem"
import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import dayjs from "dayjs"
import Link from "next/link"

interface SystemSummaryCardProps {
  system: ISystem
}

export async function SystemSummaryCard({ system }: SystemSummaryCardProps) {
  const { user } = await getUserData(system.user_id)

  const registeredFormattedDate = dayjs(system.created_at).format('DD/MM/YYYY')

  async function getUserData(userId: string) {
    const res = await api.get(`users/${userId}`, {
      method: 'GET',
      cache: 'no-store'
    })
    const user: { user: IUser } = await res.json()

    return user
  }

  return (
    <aside className="static top-32 xl:sticky w-full lg:w-auto mx-auto xl:mx-0 bg-brand-gray-600 min-w-0 md:min-w-[400px] min-h-[300px] p-4 rounded-md flex flex-col items-center xl:items-start gap-5" >
      <header className="w-full flex justify-center" >
        <h2 className="text-3xl text-brand-blue-600 text-center font-mono font-bold" >Mais informações</h2>
      </header>

      <main className="flex flex-col gap-3" >
        <div>
          <h3 className="text-brand-blue-600 font-mono font-bold" >Empresa responsável</h3>
          <Link href={`/me/${user.id}`} className="underline underline-offset-4 decoration-brand-green-300 transition-colors hover:text-brand-green-300" >{user.name}</Link>
        </div>

        <div>
          <h3 className="text-brand-blue-600 font-mono font-bold" >Registrado em</h3>
          <span>{registeredFormattedDate}</span>
        </div>
      </main>
    </aside>
  )
}