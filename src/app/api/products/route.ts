import { NextResponse } from "next/server";

export async function GET() {
  // TODO: conectar con backend/API
  return NextResponse.json({ products: [] });
}
