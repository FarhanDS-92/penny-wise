"use client";
import Link from "next/link";
import { useState } from "react";
import Logout from "./Logout.jsx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Assume user is not logged in initially
  const [userName, setUserName] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLinkClick = () => {
    // Hide the menu when a link is clicked
    setShowMenu(false);
    setLoggedIn(true);
  };

  return (
    <nav className="navbar">
      <div className="leftSide">
        <Link href="/" passHref>
          <div className="homeLink" onClick={handleLinkClick}>
            <img src="/homeicon.png" alt="" style={{ height: "45px" }} />
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

          {loggedIn ? (
            <>
              <Logout setLoggedIn={setLoggedIn} />
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
