import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function DELETE(req, res) {
  try {
    const user = await fetchUser();
    const { budgetId } = res.params;

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const budget = await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    });

    return NextResponse.json({ success: true, budget });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
