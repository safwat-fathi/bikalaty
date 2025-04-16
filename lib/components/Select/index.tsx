import clsx from "clsx";
import { ComponentProps } from "react";

type Option = { label: string; value: string | number };

type Props = ComponentProps<"select"> & {
  placeholder?: string;
  options: Option[];
  containerClassName?: string;
  error?: string[] | string | null;
  label?: string; // Adding optional label prop
};

const Select = ({ id, className, containerClassName, placeholder, options, error, label, ...props }: Props) => {
  return (
    <div className={clsx("flex flex-col gap-2", containerClassName)}>
      {label && (
        <label htmlFor={id} className="text-sm leading-3 font-normal text-neutral-400">
          {label}
        </label>
      )}
      <select
        className={clsx("select select-bordered size-full ps-4 pe-10", className, { "input-error": error })}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option, index) => (
          <option key={index} value={option.value} className="bg-white text-black">
            {option.label}
          </option>
        ))}
      </select>

      {error &&
        (Array.isArray(error) ? (
          error.map((err, index) => (
            <p key={index} className="not-prose text-error">
              {err}
            </p>
          ))
        ) : (
          <p className="not-prose text-error">{error}</p>
        ))}
    </div>
  );
};

export default Select;
