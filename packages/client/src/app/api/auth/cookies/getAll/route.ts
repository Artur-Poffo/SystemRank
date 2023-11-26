import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookiesStore = cookies()

  const allCookies = cookiesStore.getAll()

  return NextResponse.json({ allCookies }, { status: 200 })
}