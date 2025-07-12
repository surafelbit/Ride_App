import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { response } from "express";
export async function GET(request) {
  try {
    return NextResponse.json({ message: "famuuodsif" });
  } catch (error) {}
}
