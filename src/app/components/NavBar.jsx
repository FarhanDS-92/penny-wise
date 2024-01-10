"use client";
import Link from "next/link.js";
import { useState } from "react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Assume user is not logged in initially

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Your logout logic here (clearing tokens, etc.)
    setLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="leftSide">
        <Link href="/" passHref>
          <div className="homeLink">Home</div>
        </Link>
      </div>
      <div className="centerLogo">
        <img src="/penny-wise-4.png" alt="Your Logo" />
      </div>
      <div className="rightSide">
        <div className="hamburgerMenu" onClick={toggleMenu}>
          <img src="/hamburger.svg" alt="" />
        </div>
        <div className={`menuLinks ${showMenu ? "show" : ""}`}>
          <Link href="/budget">Budget</Link>
          <Link href="/goals">Goals</Link>
          {loggedIn ? (
            <>
              <Link href="/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
