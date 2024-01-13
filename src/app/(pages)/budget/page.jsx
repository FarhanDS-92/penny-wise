import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function budget() {
  const user = await fetchUser();

  const budgets = await prisma.budget.findMany({
    where: {
      userId: user.id,
    },
    include: {
      expenses: true,
      goals: true,
      capital: true,
      categories: {
        include: {
          expenses: true,
        },
      },
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
    <section className="budget-section">
      {separatedArrays.map((budgetYear) => {
        return (
          <div key={budgetYear[0].year}>
            <p>{budgetYear[0].year}</p>

            {budgetYear.map((budgetMonth) => {
              return (
                <Link key={budgetMonth.id} href={`/budget/${budgetMonth.id}`}>
                  <div>
                    <p>{budgetMonth.month}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
