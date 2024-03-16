export const getHighestExpense = (data: number[]) => {
  if (!data) return 0;
  const negative = data.filter((t) => t <= 0);
  return Math.min(...negative) || 0;
};
