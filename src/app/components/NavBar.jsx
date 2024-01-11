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

  const handleLinkClick = () => {
    // Hide the menu when a link is clicked
    setShowMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="leftSide">
        <Link href="/" passHref>
          <div className="homeLink" onClick={handleLinkClick}>
            Home
          </div>
        </Link>
      </div>
      <div className="centerLogo">
        <img src="/penny-wise-4.png" alt="Your Logo" />
      </div>
      <div className="rightSide">
        <div className="hamburgerMenu">
          <img src="/hamburger.svg" alt="" onClick={toggleMenu} />
        </div>
        <div className={`menuLinks ${showMenu ? "show" : ""}`}>
          <Link href="/budget" passHref>
            <div onClick={handleLinkClick}>Budget</div>
          </Link>
          <Link href="/goals" passHref>
            <div onClick={handleLinkClick}>Goals</div>
          </Link>
          {loggedIn ? (
            <>
              <Link href="/logout" passHref>
                <div onClick={handleLinkClick}>Logout</div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <div onClick={handleLinkClick}>Login</div>
              </Link>
              <Link href="/register" passHref>
                <div onClick={handleLinkClick}>Register</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
