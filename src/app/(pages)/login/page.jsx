"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link.js";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();

	async function handleLogin(e) {
		e.preventDefault();
		const response = await fetch("/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		});
		const info = await response.json();
		console.log(info);
		if (info.error) {
			return setError(info.error);
		}
		router.push("/");
		router.refresh();
	}

	return (
		<div>
			<div>
				<h3>Log In</h3>
				<form onSubmit={handleLogin}>
					<input
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<br />
					<input
						placeholder="email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<br />
					<input
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
					/>
					<br />
					<button type="submit">Login</button>
					<div className="">
						New to Penny Wise? <Link href={"/register"}>Register</Link>
					</div>

					<p>{error}</p>
				</form>
			</div>
		</div>
	);
}
