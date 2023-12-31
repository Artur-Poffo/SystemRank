import { DefaultAsideCard } from "@/components/UI/DefaultAsideCard"
import { RoleSpan } from "@/components/UI/RoleSpan"
import { IUser } from "@/interfaces/IUser"
import dayjs from "dayjs"

interface UserProfileCardProps {
  user: IUser
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const registeredFormattedDate = dayjs(user.created_at).format('DD/MM/YYYY')

  return (
    <DefaultAsideCard>
      <header className="-mt-14 flex flex-col items-center gap-2 mx-auto" >
        <div className={`w-24 h-24 rounded-full border-2 border-brand-green-300 p-1 ${!user.banner_profile_image_path && 'null-image-gradient'}`} >
          {user.profile_image_path && (
            <img src={user.profile_image_path} alt="Imagem de perfil do usuário" className="w-full h-full rounded-full object-cover" />
          )}
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
          <span>{registeredFormattedDate}</span>
        </div>
      </main>
    </DefaultAsideCard>
  )
}