"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link.js";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const router = useRouter();

	async function handleRegister(e) {
		e.preventDefault();
		const response = await fetch("/api/users/register", {
			method: "POST",
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
			hi
			<div>
				<form onSubmit={handleRegister}>
					<h3>Register</h3>
					<input
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<br />
					<input
						placeholder="Email"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<br />
					<input
						value={password}
						placeholder="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<button>Register</button>
					 <div className="">
						Already Registered Click here <Link href={"/login"}>Register</Link>
						to login
					</div> 

					<p>{error}</p>
				</form>
			</div>
		</div>
	);
}
