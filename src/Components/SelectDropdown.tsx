import _ from "lodash";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";
import OutsideClick from "./OutsideClick";

interface SelectDropdownInterface {
  name: string;
  value?: string;
  placeholder?: string;
  options: DropdownOptionsType[];
  defaultValue?: DropdownOptionsType;
  disableOptionKeys?: string[];
  defaultOptionKey?: string;
  required?: boolean;
  label: string;
  onChange?: any;
  isFocused?: boolean;
  control?: Control;
  rules?: RegisterOptions;
}

const SelectDropdown = forwardRef<HTMLInputElement, SelectDropdownInterface>(
  function Input(
    {
      name,
      value,
      placeholder,
      options,
      disableOptionKeys,
      defaultOptionKey,
      required,
      onChange = () => { },
      isFocused,
      defaultValue,
      control,
      rules,
      label,
      ...props
    },
    ref: any
  ) {
    const TextInputRef = !!ref ? ref : useRef<HTMLInputElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownQuery, setDropdownQuery] = useState<string | null>(null);
    const [dropdownFiltering, setDropdowFiltering] = useState(options);

    useEffect(() => {
      if (dropdownQuery && dropdownQuery?.length > 0) {
        let filtering = options.filter(
          (elem) =>
            elem.key.toLowerCase().includes(dropdownQuery) ||
            elem.value.toLowerCase().includes(dropdownQuery)
        );
        setDropdowFiltering(filtering);
      } else {
        setDropdowFiltering(options);
      }
    }, [dropdownQuery, options]);

    return (
      <OutsideClick
        outsideClick={() => {
          setShowDropdown(false);
        }}
      >
        <div className="relative w-full">
          <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({
              field: { value, onChange },
              fieldState: { error },
            }) => {
              return (
                <div className="relative">
                  <div className="relative z-20">
                    {label && (
                      <label
                        htmlFor={name}
                        className={`text-base font-semibold text-main-500 bg-white/80 px-2 py-0.5 rounded transition-all duration-300 pointer-events-none shadow-sm mb-2`}
                      >
                        {label} {rules?.required ? "(*)" : ""}
                      </label>
                    )}
                    <div className="relative">
                      <input
                        id={name}
                        ref={TextInputRef}
                        name={name}
                        className={`peer w-full px-4 py-3 text-base font-normal bg-gray-200 text-black border-none outline-none focus:ring-2 focus:ring-main-400 focus:bg-white/80 rounded-xl transition-all duration-300 accent-main-500`}
                        placeholder={
                          value?.value
                            ? value?.value
                            : !defaultOptionKey
                              ? `${placeholder}${rules?.required ? "(*)" : ""}`
                              : _.find(
                                options,
                                (item) => item.key === defaultOptionKey
                              )?.value
                        }
                        onFocus={() => {
                          setShowDropdown(true);
                        }}
                        onChange={(e) => {
                          const InputValue = e.target.value;
                          setShowDropdown(true);
                          if (
                            options.some(
                              (item) =>
                                item.value.toLowerCase() ===
                                InputValue.toLowerCase() ||
                                item.key.toLowerCase() ===
                                InputValue.toLowerCase()
                            )
                          ) {
                            onChange({
                              key: InputValue.toLowerCase(),
                              value:
                                InputValue.toLowerCase() === "fct"
                                  ? "Federal Capital Territory"
                                  : _.upperFirst(InputValue),
                            });
                            const element = document.getElementById(
                              name
                            ) as HTMLInputElement | null;

                            if (element) {
                              element.value =
                                InputValue.toLowerCase() === "fct"
                                  ? "Federal Capital Territory"
                                  : _.startCase(InputValue);
                            }
                          } else {
                            onChange(null);
                          }

                          setDropdownQuery(InputValue.toLowerCase());
                        }}
                        {...props}
                      />

                      <div
                        className="absolute top-0 bottom-0 right-2 flex items-center justify-center cursor-pointer"
                        onClick={() => {
                          setDropdowFiltering(options);
                          setShowDropdown(!showDropdown);
                        }}
                      >
                        <svg
                          className="w-3.5 h-3.5 text-main-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 8"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                          />
                        </svg>
                      </div>
                    </div>
                    {error && !focus && (
                      <span
                        className="block mt-0.5 mb-2.5 text-sm tracking-wider font-medium underline underline-offset-4 decoration-dotted text-main-500"
                        dangerouslySetInnerHTML={{
                          __html:
                            error?.message ||
                            "Error encountered with the input",
                        }}
                      ></span>
                    )}
                    {showDropdown && (
                      <div className="absolute top-full mt-1 border border-gray-100 left-0 z-50 rounded-lg shadow-md bg-gray-200 space-y-0 w-full max-h-[14rem] overflow-y-auto select-none">
                        {(dropdownFiltering &&
                          ((dropdownFiltering.length > 0 &&
                            dropdownFiltering.map((item, index) => {
                              let disable =
                                disableOptionKeys &&
                                disableOptionKeys?.includes(item?.key);
                              return (
                                <div
                                  key={index}
                                  className={`flex items-center gap-x-2 px-3 py-2 bg-gray-200 text-black hover:bg-gray-300 ${disable
                                    ? "cursor-not-allowed bg-zinc-200 opacity-70 text-opacity-20"
                                    : "cursor-pointer"
                                    }`}
                                  onClick={() => {
                                    if (!disable) {
                                      if (TextInputRef?.current) {
                                        TextInputRef.current.value =
                                          item.value.toString();
                                      }
                                      onChange(item);
                                      setShowDropdown(false);
                                      setDropdowFiltering(options);
                                    }
                                  }}
                                >
                                  <div className="flex flex-col items-start gap-0.5">
                                    <span className="font-medium text-base whitespace-nowrap">
                                      {item?.value}
                                    </span>
                                    {item?.description && (
                                      <span className="block text-xs text-gray-800">
                                        {item.description}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })) || (
                              <div className="w-full text-center">
                                <span className="text-sm font-bold text-gray-600 text-center">
                                  No dropdown with value "
                                  <span className="underline underline-offset-2 decoration-dotted">
                                    {dropdownQuery}
                                  </span>
                                  "
                                </span>
                              </div>
                            ))) || (
                            <div className="w-full text-center">
                              <span className="text-sm font-bold text-gray-600 text-center">
                                No options attached
                              </span>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          />
        </div>
      </OutsideClick>
    );
  }
);

export default SelectDropdown;
