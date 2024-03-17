import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { formatAmount } from "src/helpers/formatAmount.helper";
import { useExpenses } from "src/hooks/useExpenses.hook";

export const ExpensesCards = () => {
  const expenses = useSelector((state: RootState) => state.expenses.list);
  const valuesCellName = useSelector(
    (state: RootState) => state.fileHeaders.valuesCellName
  );

  const { totalExpenses, totalIncome, totalSavings, highestExpense } =
    useExpenses(expenses, valuesCellName);

  return (
    <div className="grid grid-cols-4 gap-4 py-4 px-8">
      <div className="bg-white rounded-md shadow-xs p-4">
        <h3>Total income</h3>
        <p
          className={clsx(
            "font-semibold",
            totalIncome > 0 ? "text-green-400" : "text-gray-500"
          )}
        >
          {formatAmount(totalIncome)}
        </p>
      </div>
      <div className="bg-white rounded-md shadow-xs p-4">
        <h3>Total Expenses</h3>
        <p
          className={clsx(
            "font-semibold",
            totalIncome > 0
              ? "text-red-400 font-semibold animate-pulse"
              : "text-gray-500"
          )}
        >
          {formatAmount(totalExpenses)}
        </p>
      </div>
      <div className="bg-white rounded-md shadow-xs p-4">
        <h3>Total Saving</h3>
        <p
          className={clsx(
            "font-semibold",
            totalSavings === 0 ? "!text-gray-400 animate-none" : "",
            totalSavings > 0 ? "text-green-400" : "text-red-400 animate-pulse"
          )}
        >
          {formatAmount(totalSavings)}
        </p>
      </div>
      <div className="bg-white rounded-md shadow-xs p-4">
        <h3>Highest expense</h3>
        <p
          className={clsx(
            "font-semibold",
            highestExpense >= 0 ? "text-gray-400" : "text-red-400 animate-pulse"
          )}
        >
          {formatAmount(highestExpense)}
        </p>
      </div>
    </div>
  );
};
