"use client";

import { useState } from "react";
import EditGoal from "@/app/components/EditGoal.jsx";

export default function CollapsibleGoal({ goals, goalToDate, totalGoals }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMonthList() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="monthBreakdown" onClick={toggleMonthList}>
        <div>GOALS</div>
        <div>
          Monthly total: ${goalToDate}/${totalGoals}
        </div>
      </div>
      {goals.map((goal) => {
        return (
          <div key={goal.id} className={`monthList ${!isOpen ? "open" : ""}`}>
            <EditGoal goal={goal} />
          </div>
        );
      })}
    </>
  );
}
