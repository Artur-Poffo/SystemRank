import { DefaultAsideCard } from "@/components/UI/DefaultAsideCard"
import { DefaultLink } from "@/components/UI/DefaultLink"
import { ISystem } from "@/interfaces/ISystem"
import { getUserData } from "@/server-functions/getUserData"
import dayjs from "dayjs"

interface SystemSummaryCardProps {
  system: ISystem
}

export async function SystemSummaryCard({ system }: SystemSummaryCardProps) {
  const { user } = await getUserData(system.user_id)

  const registeredFormattedDate = dayjs(system.created_at).format('DD/MM/YYYY')

  return (
    <DefaultAsideCard title="Mais informações" >
      <div>
        <h3 className="text-brand-blue-600 font-mono font-bold" >Empresa responsável</h3>
        <DefaultLink text={user.name} to={`/me/${user.id}`} />
      </div>

      <div>
        <h3 className="text-brand-blue-600 font-mono font-bold" >Registrado em</h3>
        <span>{registeredFormattedDate}</span>
      </div>

      <div>
        <h3 className="text-brand-blue-600 font-mono font-bold" >Descrição</h3>
        <p>{system.description}</p>
      </div>
    </DefaultAsideCard>
  )
}