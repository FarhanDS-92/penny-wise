import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import CreateBudget from "@/app/components/CreateBudget.jsx";
import CollapsibleYear from "@/app/components/CollapsibleYear.jsx";

export default async function budget() {
  const user = await fetchUser();

  const budgets = await prisma.budget.findMany({
    where: {
      userId: user.id,
    },
    include: {
      expenses: true,
    },
    orderBy: [
      {
        year: "asc",
      },
      {
        month: "asc",
      },
    ],
  });

  // this separates the budget array to be split by years and group them ot its own array
  const separatedArrays = [];
  budgets.forEach((obj) => {
    const year = obj.year;

    const index = separatedArrays.findIndex((arr) => arr[0].year === year);

    if (index === -1) {
      separatedArrays.push([obj]);
    } else {
      separatedArrays[index].push(obj);
    }
  });

  return (
    <section>
      <CreateBudget user={user} />
      <div
        className={user.isDarkMode ? "budget-section-dark" : "budget-section"}
      >
        {separatedArrays.map((budgetYear) => (
          <CollapsibleYear
            key={budgetYear[0].year}
            budgetYear={budgetYear}
            user={user}
          />
        ))}
      </div>
    </section>
  );
}
