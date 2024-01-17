import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();
    const { name, cost, budgetId, allocated } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    if (!name || !cost) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name and cost.",
      });
    }

    const goalCheck = await prisma.goal.findFirst({
      where: {
        name,
        cost,
        budgetId,
        allocated,
        userId: user.id,
      },
    });

    if (goalCheck) {
      return NextResponse.json({
        success: false,
        error: "The goal you are creating already exists",
      });
    }

    const goal = await prisma.goal.create({
      data: {
        name,
        cost,
        budgetId,
        userId: user.id,
        allocated,
      },
    });

    return NextResponse.json({ success: true, goal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
