import Paparse from "papaparse";
import { ChangeEvent, useState } from "react";
import ExcelParser, { Row } from "read-excel-file";
import styles from "./DashboardTemplate.module.css";
import { Cell } from "read-excel-file/types";
import { TransactionsTable } from "src/components/organisms/TransactionsTable";
import { UploadForm } from "src/components/organisms/UploadForm";

import clsx from "clsx";
import { useExpenses } from "src/hooks/useExpenses.hook";
import { formatAmount } from "src/helpers/formatAmount.helper";
import SingleSelect from "src/components/atoms/Inputs/SingleSelect";
import { BaseInput } from "src/components/atoms/Inputs/BaseInput";
import { transformToArrayOfObjects } from "src/helpers/transformToArrayOfObjects.helper";

export type UserDataValues = Array<{
  date: Cell;
  value: Cell;
  description: Cell;
}>;

export const DashboardTemplate = () => {
  const [filter, setFilter] = useState("");
  const [expenses, setExpenses] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [valuesCellName, setValuesCellName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dataFiltered, setDataFiltered] = useState<any[]>([]);

  function handleExcelDataRead(data: Row[]) {
    const [headers, ...values] = data;
    const valuesCellIndex = values[0].findIndex(
      (t) => !isNaN(parseFloat(t as string))
    );
    const d = transformToArrayOfObjects(data)

    setExpenses(d);
    setHeaders(headers as string[]);
    setValuesCellName(headers[valuesCellIndex] as string);
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

  const { totalExpenses, totalIncome, totalSavings, highestExpense } =
    useExpenses(expenses, valuesCellName);

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
      <div>
        <header className="px-8 flex gap-4 lg:items-center lg:flex-nowrap">
          <div>
            <label className="font-semibold text-sm text-gray-600 inline-block mb-1">
              Filtrar por:
            </label>
            <SingleSelect
              value={filter}
              onChange={setFilter}
              options={headers.map((t) => ({ label: t, value: t }))}
            />
          </div>
          <div>
            <label>Valor de:</label>
            <BaseInput
              id="search-term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {expenses &&
        expenses.length &&
        headers.length &&
        !dataFiltered.length ? (
          <TransactionsTable
            valuesCellName={valuesCellName}
            headers={headers}
            data={expenses}
          />
        ) : null}

        {expenses &&
        expenses.length &&
        headers.length &&
        dataFiltered.length ? (
          <TransactionsTable
            valuesCellName={valuesCellName}
            headers={headers}
            data={dataFiltered}
          />
        ) : null}
      </div>
    </>
  );
};
