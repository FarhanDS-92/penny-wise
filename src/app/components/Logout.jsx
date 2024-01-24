import { useRouter } from "next/navigation.js";

export default function Logout({ user }) {
  const router = useRouter();

  async function HandleLogout() {
    const response = await fetch("/api/users/logout", { method: "POST" });
    const info = await response.json();

    router.push("/");
    router.refresh();
  }

  return (
    <div
      id={user.isDarkMode ? "nav-text-dark" : "nav-text"}
      onClick={HandleLogout}
    >
      Logout
    </div>
  );
}
