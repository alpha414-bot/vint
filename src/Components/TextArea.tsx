import React, { forwardRef, useRef } from "react";
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  className?: string;
  isFocused?: boolean;
  control: Control;
  rules?: RegisterOptions;
  label: string;
}

const TextArea = forwardRef<HTMLInputElement, TextAreaProps>(function TextInput(
  {
    className = "",
    isFocused = false,
    placeholder,
    control,
    name,
    rules,
    defaultValue,
    label,
    ...props
  },
  ref: any
) {
  const input = useRef<HTMLTextAreaElement>(ref);

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <>
              <div
                className={`relative w-full transition-all duration-300`}
              >
                {label && (
                  <label
                    htmlFor={name}
                    className={`text-base font-semibold text-main-500 bg-white/80 px-2 py-0.5 rounded transition-all duration-300 pointer-events-none shadow-sm mb-2`}
                  >
                    {label} {rules?.required ? "(*)" : ""}
                  </label>
                )}
                <textarea
                  ref={input}
                  id={name}
                  className={`peer w-full px-4 py-3 text-base font-normal bg-gray-200 text-black border-none outline-none focus:ring-2 focus:ring-main-400 focus:bg-white/80 rounded-xl transition-all duration-300 ${className}`}
                  placeholder={placeholder}
                  defaultValue={value}
                  onChange={onChange}
                  {...props}
                />

                {error && (
                  <span
                    className="block mt-1 mb-2 text-sm font-medium text-red-500 underline underline-offset-4 decoration-dotted px-2"
                    dangerouslySetInnerHTML={{
                      __html: error.message || "Error encountered with the input",
                    }}
                  ></span>
                )}
              </div>
            </>
          );
        }}
      />
    </div>
  );
});

export default TextArea;
