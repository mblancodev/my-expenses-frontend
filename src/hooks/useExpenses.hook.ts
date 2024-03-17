import { useMemo } from "react";
import { calculateTotalExpenses } from "src/helpers/calculateTotalExpenses.helper";
import { calculateTotalIncome } from "src/helpers/calculateTotalIncome.helper";
import { getHighestExpense } from "src/helpers/getHighestExpense.helper";

export const useExpenses = (expenses: any[], valuesCellName: string) => {
  const _expensesValues = expenses
    ?.map((t) => t[valuesCellName])
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

  return {
    highestExpense,
    totalExpenses,
    totalSavings,
    totalIncome,
  };
};
