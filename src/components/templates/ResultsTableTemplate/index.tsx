import { useChart } from "src/hooks/useChart.hook";
import { PieChart } from "src/components/atoms/Charts/PieChart";
import { ExpensesCards } from "src/components/molecules/ExpensesCards";
import { SearchInputs } from "src/components/molecules/SearchInputs";
import { TransactionsTable } from "src/components/organisms/TransactionsTable";

export const ResultsTableTemplate = () => {
  const { createChartConfig, getLabelsFromData, minValues, maxValues } =
    useChart();

  const expenses = createChartConfig(minValues, getLabelsFromData(minValues));
  const income = createChartConfig(maxValues, getLabelsFromData(maxValues));

  return (
    <>
      <div className="grid grid-cols-2 px-4">
        <div className="h-56">
          <PieChart data={expenses} />
        </div>
        <div className="h-56">
          <PieChart data={income} />
        </div>
      </div>
      <ExpensesCards />
      <main>
        <header className="px-8 flex gap-4 lg:items-center lg:flex-nowrap">
          <SearchInputs />
        </header>
        <TransactionsTable />
      </main>
    </>
  );
};
