import { SettingsButton } from "@/components/UI/SettingsButton"
import { ISystem } from "@/interfaces/ISystem"
import { verifyAuthToken } from "@/utils/verifyAuthToken"
import jwt from "jsonwebtoken"
import { FaComputer } from "react-icons/fa6"

interface SystemHeaderProps {
  system: ISystem
}

export async function SystemHeader({ system }: SystemHeaderProps) {
  const authToken = await verifyAuthToken()
  const isTheOwner = authToken.cookie?.value ? jwt.decode(authToken.cookie.value)?.sub === system.user_id : false

  return (
    <header className="flex flex-col items-center" >
      <div className={`w-full h-[300px] lg:h-[500px] relative ${!system.system_cover_image_path && 'null-image-gradient'}`} >
        {system.system_cover_image_path && (
          <img src={system.system_cover_image_path} alt="Imagem de fundo do sistema" className="w-full h-full object-cover" />
        )}

        {isTheOwner && (
          <SettingsButton link={`systems/${system.id}/settings`} />
        )}
      </div>

      <div className="flex flex-col items-center text-center gap-4 -mt-14 z-[2]" >
        {system.system_logo_image_path ? (
          <img src={system.system_logo_image_path} alt="Logo do sistema" className="w-32 h-32 object-cover" />
        ) : (
          <FaComputer size={80} />
        )}
        <h1 className="text-4xl text-center font-mono font-bold text-brand-green-300" >{system.name}</h1>
      </div>
    </header>
  )
}