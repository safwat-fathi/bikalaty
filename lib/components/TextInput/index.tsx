import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

type IconProps = {
  icon?: ReactNode;
  clickable?: boolean;
};

type Props = {
  label?: ReactNode | string;
  startIcon?: IconProps;
  endIcon?: IconProps;
  containerClassName?: string;
  inputCLassName?: string;
  error?: string | string[] | null;
} & Omit<ComponentProps<"input">, "className">;

const TextInput = ({
  containerClassName,
  inputCLassName,
  placeholder,
  id,
  label,
  startIcon,
  endIcon,
  type,
  error,
  ...props
}: Props) => {
  return (
    <div className={clsx("flex flex-col gap-2", containerClassName)}>
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-sm leading-3 font-normal text-neutral-400">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={clsx("input input-bordered w-full", inputCLassName, {
              "input-error": error,
              "input-disabled": props.disabled,
              "ps-10": startIcon,
              "pe-10": endIcon,
            })}
            {...props}
          />

          <span
            className={clsx("absolute inset-y-[50%] start-0 grid h-12 w-10 translate-y-[-50%] place-content-center", {
              "pointer-events-none": !startIcon?.clickable,
            })}
          >
            <span aria-hidden="true" role="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">{placeholder}</span>
              {startIcon?.icon}
            </span>
          </span>

          <span
            className={clsx("absolute inset-y-[50%] end-0 grid h-12 w-10 translate-y-[-50%] place-content-center", {
              "pointer-events-none": !endIcon?.clickable,
            })}
          >
            <span aria-hidden="true" role="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">{placeholder}</span>
              {endIcon?.icon}
            </span>
          </span>
        </div>
      </div>

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

export default TextInput;
