import Paparse from "papaparse";
import { ChangeEvent, useState } from "react";
import ExcelParser, { Row } from "read-excel-file";
import styles from "./DashboardTemplate.module.css";
import { Cell } from "read-excel-file/types";
import { DateTime } from "luxon";
import { formatDate } from "src/helpers/formatDate.helper";

const VALUES_HEADER = "VALOR";

export type UserDataValues = Array<{
  date: Cell;
  value: Cell;
  description: Cell;
}>;

export const DashboardTemplate = () => {
  const [expenses, setExpenses] = useState<null | UserDataValues>(null);

  function handleExcelDataRead(data: Row[]) {
    const [headers, ...values] = data;

    const valuesIndex = headers.findIndex((t) => t === VALUES_HEADER);
    const descriptionIndex = 1;
    const dateIndex = 0;

    const result = values.reduce((acc, current, i) => {
      acc.push({
        date: current[dateIndex],
        value: current[valuesIndex],
        description: current[descriptionIndex],
      });
      return acc;
    }, [] as UserDataValues);

    setExpenses(result);
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

  return (
    <div className={styles.x}>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 cursor-default">
              My Expenses
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6"
                >
                  Expenses Excel
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-200/25 px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-sm leading-6 text-gray-200">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold px-2 text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500"
                      >
                        <span>Upload a file</span>
                        <input
                          type="file"
                          id="file-upload"
                          name="file-upload"
                          className="sr-only"
                          accept=".xlsx, .xls, .csv"
                          onChange={handleInputChange}
                        />
                      </label>
                      <p className="pl-1 cursor-default">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-100 cursor-default">
                      XML, CSV up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            Save
          </button>
        </div>
      </form>

      {expenses && expenses.length ? (
        <div className="my-10 pt-4 mx-auto max-w-xl">
          <p className="text-sm">
            Expenses list starting {`${formatDate(`${expenses[0].date}`)}`}{" "}
            until {`${formatDate(`${expenses[expenses.length - 1].date}`)}`}{" "}
          </p>
          {expenses.map((t, k) => (
            <div key={k}>
              <br />
              <div>
                <b>Date:</b>
                <span>{formatDate(`${t.date}`)}</span>{" "}
              </div>
              <div>
                <b>Value:</b>
                <span>{`${t.value}`}</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};
