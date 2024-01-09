import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();
    const { name, cost, description, completeBy } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    if (!name || !cost || !completeBy) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name, cost, and date.",
      });
    }

    const goal = await prisma.goal.create({
      data: {
        name,
        cost,
        description,
        completeBy,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, goal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
