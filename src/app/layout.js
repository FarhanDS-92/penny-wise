import { fetchUser } from "@/lib/fetchUser.js";
import NavBar from "./components/NavBar.jsx";
import "./globals.css";
import Footer from "./components/Footer.jsx";

export default async function RootLayout({ children }) {
  const user = await fetchUser();

  return (
    <html lang="en" id={user.isDarkMode ? "html-dark" : "html-light"}>
      <body>

        <NavBar user={user} />
        <div className="page-container">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
