import { prisma } from "@/lib/prisma.js";

export default async function capitalDetails({ params }) {
  const { budgetId } = params;

  const capital = await prisma.capital.findMany({
    where: {
      budgetId,
    },
  });

  return (
    <>
      <p>CAPITAL</p>
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
