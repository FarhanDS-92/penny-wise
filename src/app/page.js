import { fetchUser } from "@/lib/fetchUser.js";

export default async function Home() {
  const user = await fetchUser();
  return <div> {user.id && <div>hi {user.username}</div>}</div>;
}
