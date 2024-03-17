import { ExpensesCards } from "src/components/molecules/ExpensesCards";
import { SearchInputs } from "src/components/molecules/SearchInputs";
import { TransactionsTable } from "src/components/organisms/TransactionsTable";

export const ResultsTableTemplate = () => (
  <>
    <ExpensesCards />
    <main>
      <header className="px-8 flex gap-4 lg:items-center lg:flex-nowrap">
        <SearchInputs />
      </header>
      <TransactionsTable />
    </main>
  </>
);