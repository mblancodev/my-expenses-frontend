import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export type SelectOption = { value: string; label: string };

export interface SingleSelectProps {
  inline?: boolean;
  labelProps?: any;
  className?: string;
  value: string;
  isDisabled?: boolean;
  options: SelectOption[];
  onChange: (e: string) => void;
}

export const SingleSelect = ({
  value,
  onChange,
  options = [],
  inline = false,
  className = "",
  labelProps = {},
  isDisabled = false,
}: SingleSelectProps) => {
  const [currentValue, setCurrentValue] = useState({
    label: "",
    value: "",
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (value) {
      setCurrentValue(options.find((t) => t.value === value) as SelectOption);
    }
  }, []);

  useEffect(() => {
    if (value && value !== currentValue?.value) {
      setCurrentValue(options.find((t) => t.value === value) as SelectOption);
    } else if (!value) {
      setCurrentValue({
        label: "",
        value: "",
      });
    }
  }, [value]);

  function handleChange(o: SelectOption) {
    setCurrentValue(o);
    onChange(o.value);
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Combobox
      value={value}
      disabled={isDisabled}
      onChange={(e) => {
        // @ts-expect-error
        handleChange(e);
      }}
    >
      {({ open }) => (
        <div className={clsx(inline ? "" : "flex flex-col w-full", className)}>
          <div className="relative m-0 w-full">
            <Combobox.Button className={"w-full"}>
              <Combobox.Input
                className={clsx(
                  "base-input w-full",
                  isDisabled ? "disabled" : ""
                )}
                displayValue={() => currentValue.label}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Combobox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg">
                <Combobox.Options className="max-h-60 overflow-auto rounded-b-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.value}
                      className={({ active }) =>
                        clsx(
                          active ? "bg-gray-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex">
                            <span
                              className={clsx(
                                selected ? "font-semibold" : "font-normal",
                                "truncate"
                              )}
                            >
                              {option.label}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={clsx(
                                active ? "text-white" : "text-blue-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Transition>
          </div>
        </div>
      )}
    </Combobox>
  );
};

export default SingleSelect;
