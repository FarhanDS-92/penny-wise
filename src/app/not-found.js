import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";

export default async function NotFound() {
  const user = await fetchUser();

  return (
    <main className="notfound">
      <h1>404 error.</h1>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the
        {user.id ? (
          <Link href="/budget"> HOMEPAGE</Link>
        ) : (
          <Link href="/"> HOMEPAGE</Link>
        )}
      </p>

      <img src="/piggy.gif" className="piggy" />
    </main>
  );
}
