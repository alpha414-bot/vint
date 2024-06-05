import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  className?: string;
  isFocused?: boolean;
  control: Control;
  rules?: RegisterOptions;
  updateOnChange?: any;
}

const Input = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    type = "text",
    className = "",
    isFocused = false,
    placeholder,
    control,
    name,
    rules,
    defaultValue,
    updateOnChange = (data: any) => data,
    ...props
  },
  ref: any
) {
  const [focus, setFocus] = useState<boolean>(false);
  const [placeholderTextInput, setPlaceholderTextInput] = useState<
    string | undefined
  >(placeholder);
  const input = !!ref ? ref : useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && input?.current) {
      input?.current.focus();
    }
    if (defaultValue) {
      setFocus(true);
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Instead of using {...register}. Try to make use of Controller, that would give us upper hand over the onChange, and onBlur */}
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => {
          const FieldValue = value ? value.toString().trim() : value;
          const handleFocus = () => {
            setFocus(true);
            setPlaceholderTextInput(undefined);
          };
          const handleBlur = () => {
            setPlaceholderTextInput(placeholder);
            if (!FieldValue) {
              setFocus(false);
              return onBlur();
            }
          };
          return (
            <>
              <input
                ref={input}
                id={name}
                type={type}
                className={`${FieldValue ? "pt-4 pb-1" : "py-2"} ${
                  placeholder ? "focus:pt-4 focus:pb-1" : "focus:py-2"
                } px-3 pr-10 mb-0.5 bg-gray-700 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className} `}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={
                  placeholderTextInput
                    ? `${placeholderTextInput}${rules?.required ? "(*)" : ""}`
                    : undefined
                }
                onChange={updateOnChange(onChange)}
                defaultValue={defaultValue}
                {...props}
              />
              {error && (
                <span
                  className="block mt-0.5 mb-2.5 text-sm tracking-wider font-medium underline underline-offset-4 decoration-dotted text-red-500"
                  dangerouslySetInnerHTML={{
                    __html: error.message || "Error encountered with the input",
                  }}
                ></span>
              )}
            </>
          );
        }}
      />
      {placeholder && (
        <label
          htmlFor={name}
          className={`absolute mb-0 text-white bg-gray-700 pl-4 pr-6 py-0.5 rounded-md origin-left transform scale-75 -top-4 left-1.5 transition-all duration-400 text-lg font-semibold shadow-md shadow-gray-500 ${
            focus ? "opacity-100 -top-4" : "top-8 opacity-0"
          }`}
        >
          {placeholder} {rules?.required ? "(*)" : ""}
        </label>
      )}
    </div>
  );
});

export default Input;
