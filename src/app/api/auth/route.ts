import { NextResponse } from "next/server";

export async function POST() {
  // TODO: autenticación
  return NextResponse.json({ success: true });
}
