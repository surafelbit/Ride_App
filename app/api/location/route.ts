import { error } from "console";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "./../../../lib/prisma";
import { response } from "express";
export async function GET(request) {
  try {
    return NextResponse.json({ message: "famuuodsif" });
  } catch (error) {}
}
export async function POST(req: Request) {
  try {
    const { address } = req.json();
  } catch (error) {}
}
