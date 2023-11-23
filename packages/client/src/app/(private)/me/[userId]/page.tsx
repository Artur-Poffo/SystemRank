import { DefaultListItem } from "@/components/UI/DefaultListItem"
import { RoleSpan } from "@/components/UI/RoleSpan"
import { SystemCard } from "@/components/UI/SystemCard"
import { ISystem } from "@/interfaces/ISystem"
import { IUser } from "@/interfaces/IUser"
import { api } from "@/lib/ky"
import { notFound } from "next/navigation"

interface UserProfileProps {
  params: {
    userId: string
  }
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { user } = await getUserData(params.userId)
  const systems = user.role === "COMPANY" ? await fetchSystemsOfCompany(params.userId) : null

  async function getUserData(userId: string) {
    try {
      const res = await api.get(`users/${userId}`, {
        method: 'GET'
      })
      const user: { user: IUser } = await res.json()

      return user
    } catch {
      notFound()
    }
  }

  async function fetchSystemsOfCompany(companyId: string) {
    const res = await api.get(`systems/company/${companyId}`, {
      method: 'GET'
    })
    const { systems }: { systems: ISystem[] } = await res.json()

    return systems
  }

  return (
    <section id="profile" className="px-4 mt-40 h-screen pb-10 flex items-start justify-center gap-8" >
      <aside className="sticky top-32 bg-brand-gray-600 min-w-[400px] min-h-[300px] p-4 rounded-md flex flex-col gap-5" >
        <header className="-mt-14 flex flex-col items-center gap-2" >
          <div className="w-[100px] h-[100px] rounded-full border-2 border-brand-green-300 p-1" >
            <img src={user.profile_image_path} alt="Imagem de perfil do usuário" className="w-full h-full rounded-full object-cover" />
          </div>
          <h2 className="text-3xl text-brand-blue-600 font-mono font-bold text-center text-ellipsis" >{user.name}</h2>
          {user.role === "COMPANY" ? <RoleSpan text="Empresa" /> : <RoleSpan text="Membro" />}
        </header>

        <main className="flex flex-col gap-3" >
          <div>
            <h3 className="text-brand-blue-600 font-mono font-bold" >E-mail para contato</h3>
            <span>{user.email}</span>
          </div>

          <div>
            <h3 className="text-brand-blue-600 font-mono font-bold" >Membro desde</h3>
            <span>{JSON.stringify(user.created_at)}</span>
          </div>
        </main>
      </aside>

      <div className="flex-1 w-full flex flex-col gap-10" >
        <header className="w-full min-h-[400px] bg-brand-gray-100 rounded-md relative" >
          <img src={user.banner_profile_image_path} alt="Imagem de banner do usuário" className="absolute top-0 left-0 w-full h-full rounded-md object-cover" />
        </header>

        <main className="flex flex-col gap-14" >
          <h2 className="text-3xl text-brand-green-300 font-mono" >Sistemas da empresa</h2>

          {user.role === "COMPANY" && systems && (
            <DefaultListItem>
              {systems.map(system => {
                return (
                  <li key={system.id} className="w-full md:w-auto" >
                    <SystemCard id={system.id} name={system.name} description={system.description} logoUrl={system.system_logo_image_path || ""} />
                  </li>
                )
              })}
            </DefaultListItem>
          )}
        </main>
      </div>
    </section>
  )
}