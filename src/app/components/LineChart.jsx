"use client";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.color = "#e7842d";
defaults.font.weight = "700";

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
defaults.plugins.title.font.weight = "700";

export default function LineChart({ separatedArrays }) {
  const [trends, setTrends] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const arrYearData = [];

    for (let i = 0; i < separatedArrays.length; i++) {
      const year = {};
      const expensesData = [];
      year.label = `${separatedArrays[i][0].year}`;

      for (let j = 0; j < separatedArrays[i].length; j++) {
        expensesData.push(
          separatedArrays[i][j].expenses.reduce(
            (acc, expense) => (acc += expense.cost),
            0
          )
        );
      }

      year.data = [...expensesData];

      arrYearData.push(year);
    }

    setYearlyData([...arrYearData]);
  }, []);

  function handleToggle() {
    setTrends(!trends);
  }

  return (
    <div id="lineChart-container">
      {yearlyData.length > 0 ? (
        <button onClick={handleToggle}>Spending Trends</button>
      ) : null}

      {trends ? (
        <div id="lineChart">
          <Line
            data={{
              labels: months,
              datasets: yearlyData,
            }}
            options={{
              plugins: {
                title: {
                  text: "Yearly Trends",
                },
              },
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
