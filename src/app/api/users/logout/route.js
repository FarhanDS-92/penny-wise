import { cookies } from "next/headers.js";
import { NextResponse } from "next/server.js";

export async function POST() {
  try {
    // by logging out it means to delete the cookies
    const cookieStore = cookies();
    cookieStore.delete("token");
    return NextResponse.json({
      success: true,
      text: "You have logged out successfully.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
