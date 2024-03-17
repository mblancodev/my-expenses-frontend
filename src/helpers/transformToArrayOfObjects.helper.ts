import { ClassDictionary } from "clsx";

export const transformToArrayOfObjects = (data: any[]) => {
  // Extract the headers (the first sub-array)
  const headers = data[0] as string[];

  // Extract the rows (all sub-arrays after the headers)
  const rows = data.slice(1);

  // Transform each row into an object
  const result = rows.map((row) => {
    const rowObj: ClassDictionary = {};
    headers.forEach((header, index) => {
      rowObj[header] = row[index];
    });
    return rowObj;
  });

  return result;
};
