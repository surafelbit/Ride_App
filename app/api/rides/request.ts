import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
  const x = req.header.authorization;
  if (!x.startsWith("Bearer") || !x) {
    res.status(400).json({ message: "Invalid token" });
  }
  const token = x.split(" ")[1];
  const something = jwt.verify(
    token,
    "somegibbrishtexttorighttiomakeitencrypted"
  );
  const userid = something.id;
  const { lat, long } = req.body;
}
