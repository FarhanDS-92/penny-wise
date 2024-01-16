import { useRouter } from "next/navigation.js";

export default function Logout({ setLoggedIn }) {
  const router = useRouter();

  async function HandleLogout() {
    const response = await fetch("/api/users/logout", { method: "POST" });
    const info = await response.json();
    console.log(info);
    setLoggedIn(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div onClick={HandleLogout}>
      <button>Logout</button>
    </div>
  );
}
