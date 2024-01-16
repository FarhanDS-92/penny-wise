import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();
    const { name, budgetId } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    if (!name) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name for your category.",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        userId: user.id,
        budgetId,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
