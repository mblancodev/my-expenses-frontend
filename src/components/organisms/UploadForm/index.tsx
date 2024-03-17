import Paparse from "papaparse";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ExcelParser from "read-excel-file";
import { setExpensesList } from "src/app/slices/expenses.slice";
import {
  setFileHeadersDateCellName,
  setFileHeadersList,
  setFileHeadersValuesCellName,
} from "src/app/slices/file-headers.slice";
import { useExcelDataRead } from "src/hooks/useExcelDataRead.hook";
import { GenerativeDictionaryType } from "src/types";

export const UploadForm = () => {
  const [files, setFilesList] = useState<Array<File>>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCsvDataRead(data: any) {
    const [headers, ...values] = data;
    console.log(headers, values, "--csv");
  }

  async function handleSubmit() {
    const result: GenerativeDictionaryType<any> = {
      headers: [],
      expenses: [],
      dateCellIndex: 0,
      valuesCellIndex: 0,
    };

    for (let file of files) {
      if (file.type.includes("xml")) {
        const { expenses, headers, dateCellIndex, valuesCellIndex } =
          useExcelDataRead(await ExcelParser(file));
        result.headers = Array.from([...result.headers, ...headers]);
        result.expenses = Array.from([...result.expenses, ...expenses]);
        result.dateCellIndex = dateCellIndex;
        result.valuesCellIndex = valuesCellIndex;
      } else {
        await Paparse.parse(files[0], {
          fastMode: true,
          complete: handleCsvDataRead,
          error: (e) => console.error(e),
        });
      }
    }

    dispatch(setExpensesList(result.expenses));
    dispatch(setFileHeadersList(result.headers as string[]));
    dispatch(
      setFileHeadersDateCellName(result.headers[result.dateCellIndex] as string)
    );
    dispatch(
      setFileHeadersValuesCellName(
        result.headers[result.valuesCellIndex] as string
      )
    );

    navigate("/results");
  }

  // TODO: This file read should be when the user actually sends the form
  async function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;

    setFilesList(Array.from(files));
  }

  return (
    <form className="bg-white border border-gray-200 p-4 rounded-mg shadow-sm">
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
                Expenses files
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed dark:border-gray-200/25 border-gray-800/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 dark:text-gray-200 text-gray-700">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold px-2 text-gray-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-800"
                    >
                      <span>Upload a file</span>
                      <input
                        multiple
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
                  <p className="text-xs leading-5 dark:text-gray-200 text-gray-600 cursor-default">
                    XML, CSV up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {files.length ? (
            <div className="mt-4 cursor-default">
              <label>Files selected</label>
              <ul>
                {files.map((t, index) => (
                  <li key={index}>
                    <span className="text-sm font-medium text-grat-500">
                      {index + 1} {")"} {t.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6">
          Cancel
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          type="submit"
          className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};
