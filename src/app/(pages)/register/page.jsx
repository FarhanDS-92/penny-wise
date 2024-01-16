"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link.js";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isPopUp, setIsPopUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState("");

	const router = useRouter();

	async function handleRegister(e) {
		e.preventDefault();
		const response = await fetch("/api/users/register", {
			method: "POST",
			body: JSON.stringify({
				username,
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
				<form onSubmit={handleRegister}>
					<h3>Register</h3>
					<br />
					<input
						className="input-login-size"
						placeholder="Username"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
					<br />

					<input
						className="input-login-size"
						value={password}
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
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
							"Register"
						)}
					</button>
					<br />
					<div className="link-login-register">
						Already Registered? Click{" "}
						<Link
							href={"/login"}
							style={{ textDecoration: "none", fontSize: "12px" }}>
							<span className="click-here">here </span>
						</Link>
						to login
					</div>

					<p className="error-login">{error}</p>
				</form>
			</div>
		</div>
	);
}
