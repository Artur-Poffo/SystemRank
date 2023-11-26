import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const RegisterAuthTokenBodySchema = z.object({
    name: z.string(),
    value: z.string()
  })

  const { name, value } = RegisterAuthTokenBodySchema.parse(await req.json())

  const cookiesStore = cookies()

  cookiesStore.set({
    name,
    value,
    path: '/',
    maxAge: 3600 // 1 hour
  })

  return new NextResponse(null, {
    status: 201
  })
}