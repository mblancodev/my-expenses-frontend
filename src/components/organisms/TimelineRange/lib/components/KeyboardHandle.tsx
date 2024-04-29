// Define TypeScript interfaces for the props
interface HandleData {
  id: string;
  value: number;
  percent?: number; // percent is made optional and can default to 0
}

interface KeyboardHandleProps {
  domain: [number, number];
  handle: HandleData;
  disabled?: boolean;
  getHandleProps: (id: string) => any;
}

export const KeyboardHandle: React.FC<KeyboardHandleProps> = ({
  domain: [min, max],
  handle: { id, value, percent = 0 },
  disabled = false,
  getHandleProps,
}) => (
  <button
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    className="react_time_range__keyboard_handle"
    style={{
      left: `${percent}%`,
      backgroundColor: disabled ? "#666" : "#ffc400",
    }}
    {...getHandleProps(id)}
  />
);
