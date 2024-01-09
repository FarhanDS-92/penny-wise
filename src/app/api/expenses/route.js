import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();
    const { name, cost, description, categoryId } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    if (!name || !cost) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name and cost.",
      });
    }

    const expense = await prisma.expense.create({
      data: {
        name,
        cost,
        description,
        categoryId,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, expense });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
