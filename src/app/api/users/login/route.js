import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(request, response) {
  try {
    // cookies , username, password
    const cookieStore = cookies();
    const { username, password } = await request.json();

    // Check for if they provided a username and password
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You didn't provide a username and/or password",
      });
    }

    // get user data with the matching username
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Username doesn't exist. Please register",
      });
    }

    // we compare password in this way we are authenticating and checking if true
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({
        success: false,
        error: "Username and/or password was incorrect.",
      });
    }

    // once authenticated setting JWT and putting a cookie with that
    const token = jwt.sign(
      { userId: user.id, username, email: user.email },
      process.env.JWT_SECRET
    );

    cookieStore.set("token", token);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
