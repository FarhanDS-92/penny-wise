"use client";
import Link from "next/link";
import { useState } from "react";
import Logout from "./Logout.jsx";
import { FaHome } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { useRouter } from "next/navigation.js";

export default function Navbar({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(user.isDarkMode);
  const router = useRouter();

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function handleLinkClick() {
    // Hide the menu when a link is clicked
    setShowMenu(false);
  }

  async function modeSwitch() {
    const res = await fetch(`/api/users`, {
      method: "PUT",
      body: JSON.stringify({
        isDarkMode: !isDarkMode,
      }),
    });

    setIsDarkMode(!isDarkMode);
    router.refresh();
  }

  return (
    <nav className={user.isDarkMode ? "navbar-dark" : "navbar"}>
      <div className="leftSide">
        {user.id ? (
          <Link href="/budget" aria-label="budget overview">
            <div
              className={user.isDarkMode ? "homeLink-dark" : "homeLink"}
              onClick={handleLinkClick}
            >
              <FaHome />
            </div>
          </Link>
        ) : (
          <Link href="/" aria-label="landing page">
            <div className="homeLink" onClick={handleLinkClick}>
              <FaHome />
            </div>
          </Link>
        )}
      </div>
      <div className="centerLogo">
        <img
          src={user.isDarkMode ? "/dark_mode_logo.png" : "/light_mode_logo.png"}
          alt="Penny Wise Logo"
        />
      </div>
      <div className="rightSide">
        <button
          title="menu"
          id="menu-button"
          className={user.isDarkMode ? "homeLink-dark" : "homeLink"}
          onClick={toggleMenu}
        >
          <GiHamburgerMenu />
        </button>
        <div
          id={user.isDarkMode ? "menuLinks-dark" : "menuLinks-light"}
          className={`menuLinks ${showMenu ? "show" : ""}`}
        >
          {user.id ? (
            <>
              <div id="mode-switch" onClick={modeSwitch}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </div>
              <Link href="/budget" passHref>
                <div
                  id={user.isDarkMode ? "nav-text-dark" : "nav-text"}
                  onClick={handleLinkClick}
                >
                  Budget
                </div>
              </Link>
            </>
          ) : null}
          {user.id ? (
            <Logout user={user} />
          ) : (
            <>
              <Link href="/login" passHref>
                <div
                  id={user.isDarkMode ? "nav-text-dark" : "nav-text"}
                  onClick={handleLinkClick}
                >
                  Login
                </div>
              </Link>
              <Link href="/register" passHref>
                <div onClick={handleLinkClick}>Register</div>
              </Link>
            </>
          )}
          <Link href="/credit">
            <div
              id={user.isDarkMode ? "nav-text-dark" : "nav-text"}
              onClick={handleLinkClick}
            >
              Credit
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
