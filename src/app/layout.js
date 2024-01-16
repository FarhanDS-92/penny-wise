import { fetchUser } from "@/lib/fetchUser.js";
import NavBar from "./components/NavBar.jsx";
import "./globals.css";

export default async function RootLayout({ children }) {
  const user = await fetchUser();

  return (
    <html lang="en">
      <body>
        <NavBar user={user} />
        {children}
      </body>
    </html>
  );
}
