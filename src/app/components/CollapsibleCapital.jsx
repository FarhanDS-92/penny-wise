"use client";
import { useState } from "react";
import EditCapital from "./EditCapital.jsx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function CollapsibleCapital({ capital, totalCapital, user }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleCapital() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        className={user.isDarkMode ? "monthBreakdown-dark" : "monthBreakdown"}
        onClick={toggleCapital}
      >
        <div>CAPITAL</div>
        <div>
          Monthly total: ${totalCapital}{" "}
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
      </div>
      {capital.map((capital) => {
        return (
          <div
            key={capital.id}
            className={`monthList ${!isOpen ? "open" : ""}`}
          >
            <EditCapital capital={capital} user={user} />
          </div>
        );
      })}
    </>
  );
}
