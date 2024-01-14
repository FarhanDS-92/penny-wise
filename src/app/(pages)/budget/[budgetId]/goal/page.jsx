import { prisma } from "@/lib/prisma.js";

export default async function goalDetails({ params }) {
  const { budgetId } = params;

  let totalGoals = 0;
  let goalToDate = 0;

  const goals = await prisma.goal.findMany({
    where: {
      budgetId,
    },
  });

  for (let i = 0; i < goals.length; i++) {
    totalGoals += goals[i].cost;
  }

  for (let i = 0; i < goals.length; i++) {
    goalToDate += goals[i].allocated;
  }

  return (
    <>
      <p>
        GOALS ${goalToDate}/${totalGoals}
      </p>
      {goals.map((goal) => {
        return (
          <div key={goal.id}>
            <p>
              {goal.name} ${goal.allocated}/${goal.cost}
            </p>
            <p>{goal.description}</p>
          </div>
        );
      })}
    </>
  );
}
