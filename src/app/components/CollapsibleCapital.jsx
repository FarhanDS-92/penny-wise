"use client";
import { useState } from "react";
import EditCapital from "./EditCapital.jsx";

export default function CollapsibleCapital({ capital, totalCapital }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleCapital() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="monthBreakdown" onClick={toggleCapital}>
        <div>CAPITAL</div>
        <div>Monthly total: ${totalCapital}</div>
      </div>
      {capital.map((capital) => {
        return (
          <div
            key={capital.id}
            className={`monthList ${!isOpen ? "open" : ""}`}
          >
            <EditCapital capital={capital} />
          </div>
        );
      })}
    </>
  );
}
