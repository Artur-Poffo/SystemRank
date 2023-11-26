import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE() {
  const cookiesStore = cookies()

  cookiesStore.delete('systems.token')
  cookiesStore.delete('systems.refreshToken')

  return new NextResponse(null, {
    status: 204
  })
}