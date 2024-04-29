import { TimelineRange as Range } from "src/components/organisms/TimelineRange";
import { addMinutes, endOfToday, set } from "date-fns";
import { useState } from "react";
import { formatDate } from "src/helpers/formatDate.helper";

const now = new Date();
const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

const startTime = getTodayAtSpecificHour(7);
const endTime = endOfToday();

const disabledIntervals = [
  { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) },
];

export const TimelineRange = () => {
  const selectedInterval = [startTime, endTime];
  const [time, setSelectedTime] = useState([now, addMinutes(now, 10)]);

  const handleOnChange = (values: readonly number[]) => {
    const time = values.map((t) => new Date(t));
    setSelectedTime(time);
  };

  const formatDateHours = (date: string, format: "DD" | "HH:mm" = "HH:mm") => {
    return formatDate(date, format);
  };

  const errorHandler = ({ error }: { error: boolean }) => {
    // console.log(error);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "Arial",
          margin: 5,
        }}
      >
        <div className="text-sm">
          {formatDateHours(`${time[0]}`, "DD")}
          <br />
          {formatDateHours(`${time[0]}`)}, {formatDateHours(`${time[1]}`)}
        </div>
      </div>
      <Range
        mode={3}
        ticksCount={48}
        onChange={handleOnChange}
        onUpdateCallback={errorHandler}
        step={10 * 60 * 1000} // 10 minutes
        disabledIntervals={disabledIntervals}
        values={time.map((t) => +t) as [number, number]}
        timelineInterval={selectedInterval as [Date, Date]}
      />
    </>
  );
};
