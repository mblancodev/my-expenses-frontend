import { useChart } from "src/hooks/useChart.hook";
import { PieChart } from "src/components/atoms/Charts/PieChart";
import { ExpensesCards } from "src/components/molecules/ExpensesCards";
import { SearchInputs } from "src/components/molecules/SearchInputs";
import { TransactionsTable } from "src/components/organisms/TransactionsTable";

export const ResultsTableTemplate = () => {
  const { chartConfig } = useChart();

  return (
    <>
      <div className="h-screen">
        <PieChart data={chartConfig} />
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
