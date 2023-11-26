import { IUser } from "@/interfaces/IUser";
import { api } from "@/lib/ky";
import { NextResponse } from "next/server";

export async function verifyUserRole(roleToVerify: "MEMBER" | "COMPANY", userId: string) {
  "use server"

  try {
    const res = await api.get(`users/${userId}`, {
      method: 'GET'
    })
    const {user}: { user: IUser } = await res.json()

    if (!user || user.role !== roleToVerify) {
      return NextResponse.redirect('/explore', {
        status: 401
      })
    }

    return new NextResponse(null, {
      status: 200
    })
  } catch (err) {
    console.error('Erro ao verificar permissões do usuário: ', err)
  }
}