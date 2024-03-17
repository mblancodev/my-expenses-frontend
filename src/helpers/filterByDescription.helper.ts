export const filterByDescription = (
  data: any[],
  descriptionIndex: number,
  searchTerm: string
) => {
  const filteredData = data.filter((item) =>
    item[descriptionIndex].includes(searchTerm.toLowerCase())
  );
  return filteredData;
};
