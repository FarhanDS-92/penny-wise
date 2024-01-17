"use client";
import Link from "next/link";
import { useState } from "react";
import Logout from "./Logout.jsx";
import { FaHome } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ user }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
            <FaHome />
          </div>
        </Link>
      </div>
      <div className="centerLogo">
        <img src="/penny-wise-4.png" alt="Your Logo" />
      </div>
      <div className="rightSide">
        <div className="homeLink" onClick={toggleMenu}>
          <GiHamburgerMenu />
        </div>
        <div className={`menuLinks ${showMenu ? "show" : ""}`}>
          <Link href="/budget" passHref>
            <div onClick={handleLinkClick}>Budget</div>
          </Link>

          {user.id ? (
            <>
              <Logout />
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
