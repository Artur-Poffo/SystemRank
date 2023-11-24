import { RoleSpan } from "@/components/UI/RoleSpan"
import { IUser } from "@/interfaces/IUser"
import dayjs from "dayjs"

interface UserProfileCardProps {
  user: IUser
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const formattedDate = dayjs(user.created_at).format('DD/MM/YYYY')

  return (
    <aside className="static top-32 xl:sticky w-full md:w-auto mx-auto xl:mx-0 bg-brand-gray-600 min-w-0 md:min-w-[400px] min-h-[300px] p-4 rounded-md flex flex-col items-center xl:items-start gap-5" >
      <header className="-mt-14 flex flex-col items-center gap-2 mx-auto" >
        <div className="w-24 h-24 rounded-full border-2 border-brand-green-300 p-1" >
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
          <span>{formattedDate}</span>
        </div>
      </main>
    </aside>
  )
}