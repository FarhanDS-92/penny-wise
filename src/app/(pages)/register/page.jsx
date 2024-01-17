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
        password,
        email,
      }),
    });
    const info = await response.json();
    console.log(info);
    if (info.error) {
      return setError(info.error);
    }
    router.push("/budget");
    router.refresh();
  }
  const handleClosePopup = () => {
    router.push("/");
    router.refresh();
  };

  return (
    <div className="overlay">
      <div className="popup">
        <span className="close" onClick={handleClosePopup}>
          x
        </span>
        <div>
          <h3>Register</h3>
          <br />
          <form className="login-regForm" onSubmit={handleRegister}>
            <input
              className="input-login-size"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <br />

            <input
              className="input-login-size"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
              className="input-login-size"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          <br />
          <button type="submit" className="btn-login">
            Register
          </button>
          <br />
          <div className="link-login-register">
            <p>Already Registered?</p>
            <p>
              <Link className="click-here" href={"/login"}>
                Click here{" "}
              </Link>
              to login
            </p>
          </div>
            <p className="error-login">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
