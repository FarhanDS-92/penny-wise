import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function DELETE(req, res) {
  try {
    const user = await fetchUser();
    const { categoryId } = res.params;

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const category = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req, res) {
  try {
    const user = await fetchUser();
    const { categoryId } = res.params;
    const { name } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const category = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
