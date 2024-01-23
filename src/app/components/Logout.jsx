import { useRouter } from "next/navigation.js";

export default function Logout() {
  const router = useRouter();

  async function HandleLogout() {
    const response = await fetch("/api/users/logout", { method: "POST" });
    const info = await response.json();

    router.push("/");
    router.refresh();
  }

  return <div onClick={HandleLogout}>Logout</div>;
}
