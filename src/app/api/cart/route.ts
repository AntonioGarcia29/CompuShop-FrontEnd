import { NextResponse } from "next/server";

export async function GET() {
  // TODO: obtener carrito del usuario
  return NextResponse.json({ items: [] });
}

export async function POST() {
  // TODO: agregar item al carrito
  return NextResponse.json({ success: true });
}
