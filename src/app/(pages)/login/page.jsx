"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Link from "next/link.js";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

export default function Login() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
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
    router.push("/budget");
    router.refresh();
  }

  function handleClosePopup() {
    router.push("/");
    router.refresh();
  }

  return (
    <section className="overlay">
      <title>Login page</title>
      <div className="popup">
        <span className="close" onClick={handleClosePopup}>
          x
        </span>
        <div>
          <h3>Log In</h3>
          <br />
          <form
            aria-label="register form"
            className="login-regForm"
            onSubmit={handleLogin}
          >
            <input
              aria-label="username"
              className="input-login-size "
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <br />

            <div className="pw-div">
              <input
                aria-label="password"
                type={showPassword ? "text" : "password"}
                className="input-login-size "
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                aria-label="password visibility"
                className="password-vis"
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <IoMdEyeOff /> : <FaEye />}
              </button>
            </div>
            <br />

            <button
              type="submit"
              disabled={isLoading}
              className="btn-login-register"
            >
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
              <p>New to Penny-Wise?</p>
              <p>
                <Link className="click-here" href={"/register"}>
                  Click here{" "}
                </Link>
                to register
              </p>
            </div>

            <p className="error-login">{error}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
