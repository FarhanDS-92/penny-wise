import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request, response) {
  try {
    // cookies , username, password
    const cookieStore = cookies();
    const { username, password, email } = await request.json();

    // Check for if they provided a username and password
    if (!username || !password || !email) {
      return NextResponse.json({
        success: false,
        error: "You need to provide a username, password, and email.",
      });
    }

    // check for if the provided username is already used
    const checkUsername = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkUsername) {
      return NextResponse.json({
        success: false,
        error: "Username already exist",
      });
    }

    // check for if the provided email is already used
    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return NextResponse.json({
        success: false,
        error: "Email already exist",
      });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 16);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });

    // setting JWT and putting a cookie with that
    const token = jwt.sign(
      { userId: user.id, username, email },
      process.env.JWT_SECRET
    );

    cookieStore.set("token", token);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
