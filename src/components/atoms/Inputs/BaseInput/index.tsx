import clsx from "clsx";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

const inputClassNames = "base-input";

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  replaceClassName?: boolean;
  placeholder?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  value?: any;
  disabled?: boolean;
  readOnly?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const BaseInput = ({
  replaceClassName = false,
  placeholder = "",
  className = "",
  value = "",
  type,
  readOnly = false,
  disabled = false,
  ...props
}: BaseInputProps) => {
  return (
    <input
      {...props}
      type={type}
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      placeholder={placeholder}
      className={clsx(
        replaceClassName ? className : `${inputClassNames} ${className}`
      )}
    />
  );
};
