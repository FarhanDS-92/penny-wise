import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function DELETE(req, res) {
  try {
    const user = await fetchUser();
    const { goalId } = res.params;

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const goal = await prisma.goal.delete({
      where: {
        id: goalId,
      },
    });

    return NextResponse.json({ success: true, goal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req, res) {
  try {
    const user = await fetchUser();
    const { goalId } = res.params;
    const { name, cost, allocated } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const goal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        name,
        cost,
        allocated,
      },
    });

    return NextResponse.json({ success: true, goal });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
