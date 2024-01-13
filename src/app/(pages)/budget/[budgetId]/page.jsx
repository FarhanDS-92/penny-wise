export default async function budgetDetails({ params }) {
  const { budgetId } = params;
  return <p>{budgetId}</p>;
}
