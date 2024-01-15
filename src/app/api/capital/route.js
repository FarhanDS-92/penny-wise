import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();
    const { name, amount, budgetId } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    if (!name || !amount) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name and amount.",
      });
    }

    const capital = await prisma.capital.create({
      data: {
        name,
        amount,
        userId: user.id,
        budgetId,
      },
    });

    return NextResponse.json({ success: true, capital });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
