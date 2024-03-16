export const calculateTotalExpenses = (data: number[]): number => {
  let result = 0;

  if (data?.length) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] <= 0) {
        result -= parseFloat(`${data[i]}`);
      }
    }
  }

  return parseFloat(`${result}`);
};
