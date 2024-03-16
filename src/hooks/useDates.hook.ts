import { DateTime } from "luxon";
import { useMemo } from "react";

export const useDate = (date: string) => {
  const [currentMonthNumber, currentMonthName, currentYear, currentWeek] =
    useMemo(
      () => [
        DateTime.fromJSDate(new Date(date)).month,
        DateTime.fromJSDate(new Date(date)).monthLong,
        DateTime.fromJSDate(new Date(date)).year,
        DateTime.fromJSDate(new Date(date)).weekNumber,
      ],
      [date]
    );

  return {
    currentYear,
    currentWeek,
    currentMonthName,
    currentMonthNumber,
  };
};
