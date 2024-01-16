"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link.js";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isPopUp, setIsPopUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const router = useRouter();

	async function handleLogin(e) {
		e.preventDefault();
		const response = await fetch("/api/users/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username,
				password,
			}),
		});
		const info = await response.json();
		setIsLoading(false);
		if (info.error) {
			return setError(info.error);
		}
		router.push("/");
		router.refresh();
	}
	const handleClosePopup = () => {
		setIsPopUp(true);
		router.push("/");
		router.refresh();
	};

	return (
		<div className="overlay">
			<div className="popup">
				<span className="close" onClick={handleClosePopup}>
					x
				</span>
				<h3>Log In</h3>
				<br />
				<form onSubmit={handleLogin}>
					<input
						className="input-login-size "
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<br />

					<input
						className="input-login-size "
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
					/>
					<br />

					<button type="submit" disabled={isLoading} className="btn-login">
						{isLoading ? (
							<img
								src="spinball.svg"
								alt="gear-loading"
								width={40}
								height={40}
							/>
						) : (
							"Login"
						)}
					</button>
					<br />
					<div className="link-login-register">
						New to Penny Wise? Click{" "}
						<Link
							href={"/register"}
							style={{ textDecoration: "none", fontSize: "12px" }}>
							<span className="click-here">here </span>
						</Link>
						to register
					</div>

					<p className="error-login">{error}</p>
				</form>
			</div>
		</div>
	);
}
