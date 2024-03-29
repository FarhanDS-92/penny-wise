export default function BudgetLink({ budget, user }) {
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

  function getTotalCost(budget) {
    let totalExpense = 0;

    for (let i = 0; i < budget.expenses.length; i++) {
      totalExpense += budget.expenses[i].cost;
    }

    return totalExpense;
  }

  return (
    <div className={user.isDarkMode ? "budgetMonth-dark" : "budgetMonth"}>
      <p>{`${months[budget.month - 1]}`}</p>
      <p>Monthly Expense: ${getTotalCost(budget)}</p>
    </div>
  );
}
