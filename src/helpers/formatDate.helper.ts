import { DateTime } from "luxon";

export const formatDate = (date: string, format?: string) => {
  return DateTime.fromJSDate(new Date(date))
    .toFormat(format ? format : "yyyy LLL dd")
    .toString();
};
