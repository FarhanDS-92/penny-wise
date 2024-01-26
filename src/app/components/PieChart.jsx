"use client";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({ expenseLabelArr, expenseCostArr }) {
  return (
    <div style={{ display: "flex", maxWidth: "500px" }}>
      <Pie
        data={{
          labels: expenseLabelArr,
          datasets: [
            {
              label: "Expense",
              data: expenseCostArr,
            },
          ],
        }}
      />
    </div>
  );
}
