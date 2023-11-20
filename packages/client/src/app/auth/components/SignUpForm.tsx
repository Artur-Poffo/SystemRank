import { DefaultButton } from "@/components/UI/DefaultButton";
import { DefaultInput } from "@/components/UI/DefaultInput";
import Link from "next/link";

export function SignUpForm() {
  return (
    <form className="w-full flex flex-col items-center gap-4" >
      <div className="w-full flex flex-col gap-4" >
        <div className="flex flex-col gap-1" >
          <DefaultInput name="name" label="Nome" placeholder="Nome" required />
        </div>

        <div className="flex flex-col gap-1" >
          <DefaultInput name="email" label="E-mail" placeholder="E-mail" required />
        </div>

        <div className="flex flex-col gap-1" >
          <DefaultInput name="password" label="Senha" placeholder="Senha" required />
        </div>

        <div className="flex flex-col gap-2" >
          <label className="text-sm text-brand-blue-600 font-bold" >Tipo usuário:</label>

          <div className="flex items-center gap-4" >
            <div className="flex items-center gap-1" >
              <label htmlFor="normalUser">Usuário comum</label>
              <input type="radio" className="accent-brand-green-300" id="normalUser" name="userType" />
            </div>

            <div className="flex items-center gap-1" >
              <label htmlFor="companyUser">Empresa</label>
              <input type="radio" className="accent-brand-green-300" id="companyUser" name="userType" />
            </div>
          </div>
        </div>
      </div>

      <DefaultButton text="Cadastrar" type="submit" className="w-full py-2" />

      <Link href={'/auth/signin'} className="text-sm text-brand-green-300 underline underline-offset-2 font-bold" >Já tem uma conta? Entrar</Link>
    </form>
  )
}