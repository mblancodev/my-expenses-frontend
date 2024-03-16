import { DateTime } from "luxon";

export const formatDate = (date: string) => {
  return `${DateTime.fromJSDate(new Date(date)).toFormat("yyyy LLL dd")}`;
};
