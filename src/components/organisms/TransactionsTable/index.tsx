import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { GenerativeDictionaryType } from "src/types";
import { formatDate } from "src/helpers/formatDate.helper";
import { formatAmount } from "src/helpers/formatAmount.helper";

export interface TransactionsTableProps {
  headers: string[];
  valuesCellName: string;
  data: GenerativeDictionaryType<any>;
}

let isDataFormatted = false;

export const TransactionsTable = () => {
  const headers = useSelector((state: RootState) => state.fileHeaders.list);
  const valuesCellName = useSelector(
    (state: RootState) => state.fileHeaders.valuesCellName
  );
  const dateCellName = useSelector(
    (state: RootState) => state.fileHeaders.dateCellName
  );
  const data = useSelector((state: RootState) => state.expenses.list);
  const [formattedData, setFormattedData] = useState<any[]>([]);

  function handleFormatColumnAmount(data: any[], valuesCellName: string) {
    const f = JSON.parse(JSON.stringify(data)).map((t: any) => {
      t[valuesCellName] = formatAmount(t[valuesCellName] as number);
      t[dateCellName] = formatDate(t[dateCellName] as string);
      return t;
    });
    return f;
  }

  useEffect(() => {
    if (data?.length && !isDataFormatted) {
      setFormattedData(handleFormatColumnAmount(data, valuesCellName));
      isDataFormatted = true;
    }
  }, [data]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 cursor-default">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 rounded-md">
                <thead>
                  <tr>
                    {headers.map((k, i) => (
                      <th
                        key={i}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        <div>{k}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {formattedData.map((item, k) => (
                    <tr
                      key={k + Math.random() * 23}
                      className="even:bg-gray-50"
                    >
                      {headers.map((key, i) => (
                        <td
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                          key={i + key}
                        >
                          {`${item[key]}`}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
