import styles from "./DashboardTemplate.module.css";
import { UploadForm } from "src/components/organisms/UploadForm";
import { SearchInputs } from "src/components/molecules/SearchInputs";
import { ExpensesCards } from "src/components/molecules/ExpensesCards";
import { TransactionsTable } from "src/components/organisms/TransactionsTable";

export const DashboardTemplate = () => {
  return (
    <>
      <div className={styles.x}>
        <UploadForm />
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
