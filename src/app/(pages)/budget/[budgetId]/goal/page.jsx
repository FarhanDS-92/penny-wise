import { prisma } from "@/lib/prisma.js";

export default async function goalDetails({ params }) {
  const { budgetId } = params;

  const goals = await prisma.goal.findMany({
    where: {
      budgetId,
    },
  });

  return (
    <>
      <p>GOALS</p>
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
