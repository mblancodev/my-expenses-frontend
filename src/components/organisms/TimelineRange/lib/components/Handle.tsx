import React from "react";
import { DateValuesType } from "../..";

// Define TypeScript interfaces for the props
interface HandleData {
  id: string;
  value: number;
  percent?: number; // percent is made optional and can default to 0
}

interface HandleProps {
  error?: boolean;
  handle: HandleData;
  disabled?: boolean;
  domain: DateValuesType;
  getHandleProps: (id: string) => any;
}

// The Handle functional component using TypeScript
export const Handle: React.FC<HandleProps> = ({
  error,
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled = false,
  getHandleProps,
}) => {
  const leftPosition = `${percent}%`;

  return (
    <>
      <button
        type="button"
        className="react_time_range__handle_wrapper"
        style={{ left: leftPosition }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`react_time_range__handle_container${
          disabled ? "__disabled" : ""
        }`}
        style={{ left: leftPosition }}
      >
        <div
          className={`react_time_range__handle_marker${error ? "__error" : ""}`}
        />
      </div>
    </>
  );
};
