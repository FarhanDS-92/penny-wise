import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function PUT(req, res) {
  try {
    const user = await fetchUser();
    const { isDarkMode } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const darkMode = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isDarkMode,
      },
    });

    return NextResponse.json({ success: true, darkMode });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
