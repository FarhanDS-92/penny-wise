import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function DELETE(req, res) {
  try {
    const user = await fetchUser();
    const { capitalId } = res.params;

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const capital = await prisma.capital.delete({
      where: {
        id: capitalId,
      },
    });

    return NextResponse.json({ success: true, capital });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req, res) {
  try {
    const user = await fetchUser();
    const { capitalId } = res.params;
    const { name, amount, description } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const capital = await prisma.capital.update({
      where: {
        id: capitalId,
      },
      data: {
        name,
        amount,
        description,
      },
    });

    return NextResponse.json({ success: true, capital });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
