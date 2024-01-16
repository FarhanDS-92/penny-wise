import Link from "next/link.js";

export default function NotFound() {
  return (
    <main className="notfound">
      <h2>404 error.</h2>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the <Link href="/">Main</Link> page
      </p>

      <img src="/brokenpig.jpg" />
    </main>
  );
}
