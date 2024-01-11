import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();
    const { month, year } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const checkBudget = await prisma.budget.findFirst({
      where: {
        month,
        year,
      },
    });

    if (checkBudget) {
      return NextResponse.json({
        success: false,
        error: "Budget already exists.",
      });
    }

    const budget = await prisma.budget.create({
      data: {
        month,
        year,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, budget });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
