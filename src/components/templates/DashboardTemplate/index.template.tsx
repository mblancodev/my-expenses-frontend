import Paparse from "papaparse";
import { ChangeEvent, useMemo, useState } from "react";
import ExcelParser, { Row } from "read-excel-file";
import styles from "./DashboardTemplate.module.css";
import { Cell } from "read-excel-file/types";
import { TransactionsTable } from "src/components/organisms/TransactionsTable";
import { UploadForm } from "src/components/organisms/UploadForm";
import { calculateTotalIncome } from "src/helpers/calculateTotalIncome.helper";
import { formatAmount } from "src/helpers/formatAmount.helper";
import { calculateTotalExpenses } from "src/helpers/calculateTotalExpenses.helper";

import clsx from "clsx";
import { getHighestExpense } from "src/helpers/getHighestExpense.helper";

export type UserDataValues = Array<{
  date: Cell;
  value: Cell;
  description: Cell;
}>;

export const DashboardTemplate = () => {
  const [expenses, setExpenses] = useState<null | any[]>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [valuesIndex, setValuesIndex] = useState<number>(0);

  function handleExcelDataRead(data: Row[]) {
    const [headers, ...values] = data;

    const valuesIndex = values[0].findIndex(
      (t) => !isNaN(parseFloat(t as string))
    );

    setHeaders(headers as string[]);
    setValuesIndex(valuesIndex);
    setExpenses(values);
  }

  function handleCsvDataRead(data: any) {
    const [headers, ...values] = data;
    console.log(headers, values, "--csv");
  }

  async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;

    if (files[0].type.includes("xml")) {
      handleExcelDataRead(await ExcelParser(files[0]));
    } else {
      await Paparse.parse(files[0], {
        fastMode: true,
        complete: handleCsvDataRead,
        error: (e) => console.error(e),
      });
    }
  }

  const _expensesValues = expenses
    ?.map((t) => t[valuesIndex])
    .flat() as number[];

  const totalExpenses = useMemo(() => {
    return calculateTotalExpenses(_expensesValues);
  }, [_expensesValues]);

  const totalIncome = useMemo(() => {
    return calculateTotalIncome(_expensesValues);
  }, [_expensesValues]);

  const totalSavings = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const highestExpense = useMemo(() => {
    return getHighestExpense(_expensesValues);
  }, [_expensesValues]);

  return (
    <>
      <div className={styles.x}>
        <UploadForm handleInputChange={handleInputChange} />
      </div>
      <div className="grid grid-cols-4 gap-4 py-4 px-12">
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
              highestExpense >= 0
                ? "text-gray-400"
                : "text-red-400 animate-pulse"
            )}
          >
            {formatAmount(highestExpense)}
          </p>
        </div>
      </div>
      {expenses && expenses.length && headers.length ? (
        <TransactionsTable
          valuesIndex={valuesIndex}
          headers={headers}
          data={expenses}
        />
      ) : null}
    </>
  );
};
