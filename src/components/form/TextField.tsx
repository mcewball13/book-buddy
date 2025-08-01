import { useFormContext } from "react-hook-form";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

export const TextField = ({
  name,
  label,
  placeholder,
  type = "text",
}: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        id={name}
        placeholder={placeholder}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {errors[name] && (
        <span className="text-xs text-red-500">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};
