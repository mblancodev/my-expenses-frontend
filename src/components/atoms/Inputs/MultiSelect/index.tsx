import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export type OptionItemType = { label: string; value: string };

export const MultiSelect = ({
  placeholder = "Selecciona una o mas opciones",
  options = [],
  onChange,
  value,
}: {
  placeholder?: string;
  options: Array<OptionItemType>;
  value: OptionItemType[];
  onChange: (e: OptionItemType[]) => void;
}) => {
  const [selected, setSelectedOptions] = useState<OptionItemType[]>([]);

  const handleOptionSelect = (options: OptionItemType[]) => {
    setSelectedOptions(options);
    onChange(options);
  };

  useEffect(() => {
    if (value) {
      setSelectedOptions(value);
    }
  }, []);

  return (
    <Listbox multiple value={selected} onChange={handleOptionSelect}>
      {({ open }) => (
        <>
          <div className="relative cursor-pointer">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
              <span className="block truncate cursor-pointer">
                {selected.length ? (
                  <div className="inline-flex gap-2">
                    <span className="p-1 rounded-md px-3 text-xs text-white bg-blue-500 text-center">
                      {selected[0].label}
                    </span>
                    {selected.length > 1 ? (
                      <span className="p-1 rounded-md px-3 text-xs text-white bg-blue-500 text-center">
                        {selected.length - 1} +
                      </span>
                    ) : null}
                  </div>
                ) : (
                  <span className="text-sm">{placeholder}</span>
                )}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active, selected }) =>
                      clsx(
                        active
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-500",
                        "relative select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected
                              ? "font-semibold !text-blue-600"
                              : "font-normal",
                            "block truncate cursor-pointer"
                          )}
                        >
                          {option.label}
                        </span>

                        {selected ? (
                          <span
                            className={clsx(
                              selected ? "text-blue-600" : "",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default MultiSelect;
