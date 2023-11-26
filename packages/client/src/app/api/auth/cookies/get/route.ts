import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const GetAuthTokenQuerySchema = z.object({
    name: z.string()
  })
  const searchParams = req.nextUrl.searchParams
  
  const { name } = GetAuthTokenQuerySchema.parse(searchParams.get('name'))

  const cookiesStore = cookies()

  const token = cookiesStore.get(name)

  return NextResponse.json({ token }, { status: 200 })
}