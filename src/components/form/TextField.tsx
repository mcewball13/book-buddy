import { useFormContext } from "react-hook-form";
import { useCallback } from "react";

interface TextFieldProps {
  name: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  required?: boolean;
}

export const TextField = ({
  name,
  placeholder,
  type = "text",
}: TextFieldProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = watch(name) || "";
  const fieldError = errors[name];
  const hasError = !!fieldError;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(name, event.target.value, { shouldValidate: true });
    },
    [name, setValue]
  );

  const containerStyles = "flex flex-col gap-1";

  const baseInputStyles =
    "rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-colors";

  const inputVariants = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    error: "border-red-300 focus:border-red-500 focus:ring-red-500",
  };

  const errorMessageStyles = "text-xs text-red-500";

  return (
    <div className={containerStyles}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${baseInputStyles} ${
          inputVariants[hasError ? "error" : "default"]
        }`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
      />
      {fieldError && (
        <span id={`${name}-error`} className={errorMessageStyles} role="alert">
          {fieldError.message as string}
        </span>
      )}
    </div>
  );
};
