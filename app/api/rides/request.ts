// import { error } from "console";
// import { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     console.log(session?.user?.id, "something is here should be displayed");

//     // const x = req.header.authorization;
//     // if (!x.startsWith("Bearer") || !x) {
//     //   res.status(400).json({ message: "Invalid token" });
//     // }
//     // const token = x.split(" ")[1];
//     // const something = jwt.verify(
//     //   token,
//     //   "somegibbrishtexttorighttiomakeitencrypted"
//     // );
//     const userid = session?.user?.id;
//     const { lat, long } = req.body;
//     const data = await prisma.ride.create({
//       data: {
//         passengerId: userid,
//         pickupLng: long,
//         pickupLat: lat,
//       },
//     });
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// pages/api/ride/create.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { prisma } from "@/lib/prisma"; // assuming prisma is exported here

// export default async function POST(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const session = await getServerSession(req, res, authOptions);

//     if (!session || !session.user?.id) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const { lat, long } = req.body;

//     const data = await prisma.ride.create({
//       data: {
//         passengerId: session.user.id,
//         pickupLng: long,
//         pickupLat: lat,
//       },
//     });

//     console.log(data);
//     return res.status(201).json({ message: "Ride created", ride: data });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }
// app/api/rides/request/route.ts
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { lat, long } = body;

    const ride = await prisma.ride.create({
      data: {
        passengerId: session.user.id,
        pickupLat: lat,
        pickupLng: long,
      },
    });

    return NextResponse.json(
      { message: "Ride created", ride },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
