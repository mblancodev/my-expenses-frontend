import { useEffect, useState } from "react";
import MultiSelect from "src/components/atoms/Inputs/MultiSelect";
import { formatAmount } from "src/helpers/formatAmount.helper";

export interface TransactionsTableProps {
  valuesIndex: number;
  headers: string[];
  data: Array<{
    [s: string]: any;
  }>;
}

let isDataFormatted = false;

export const TransactionsTable = ({
  data,
  headers,
  valuesIndex,
}: TransactionsTableProps) => {
  const [formattedData, setFormattedData] = useState<any[]>([]);

  function handleFormatColumnAmount(data: any[], k: number) {
    const f = data.map((t) => {
      t[k] = formatAmount(t[k] as number);
      return t;
    });
    return f;
  }

  useEffect(() => {
    if (data?.length && !isDataFormatted) {
      setFormattedData(handleFormatColumnAmount(data, valuesIndex));
      isDataFormatted = true;
    }
  }, [data]);

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 cursor-default">
            <header className="px-8 flex lg:justify-between lg:items-center lg:flex-nowrap">
              <div>
                <label className="font-semibold text-sm text-gray-600 inline-block mb-1">Filtrar por:</label>
                <MultiSelect options={[]} onChange={() => {}} value={[]} />
              </div>
            </header>
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
                      {headers.map((_, i) => (
                        <td
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                          key={i + _}
                        >
                          {`${item[i]}`}
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
