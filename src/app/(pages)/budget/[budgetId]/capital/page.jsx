import { prisma } from "@/lib/prisma.js";

export default async function capitalDetails({ params }) {
  const { budgetId } = params;

  let totalCapital = 0;

  const capital = await prisma.capital.findMany({
    where: {
      budgetId,
    },
  });

  for (let i = 0; i < capital.length; i++) {
    totalCapital += capital[i].amount;
  }

  return (
    <>
      <p>CAPITAL ${totalCapital}</p>
      {capital.map((capital) => {
        return (
          <div key={capital.id}>
            <p>
              {capital.name} ${capital.amount}
            </p>
            <p>{capital.description}</p>
          </div>
        );
      })}
    </>
  );
}
