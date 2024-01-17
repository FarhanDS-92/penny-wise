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

    if (!month || !year) {
      return NextResponse.json({
        success: false,
        error: "You must provide a month and year",
      });
    }

    if (month === NaN || year === NaN) {
      return NextResponse.json({
        success: false,
        error: "Month and year both have to be a number",
      });
    }

    if (
      month.toString().length > 2 ||
      year.toString().length !== 4 ||
      Math.floor(month) > 12 ||
      Math.floor(month) < 1
    ) {
      return NextResponse.json({
        success: false,
        error: "Please enter a valid month and year MM / YYYY",
      });
    }

    const checkBudget = await prisma.budget.findFirst({
      where: {
        userId: user.id,
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
