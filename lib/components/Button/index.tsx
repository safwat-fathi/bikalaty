import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

import CircleSpinnerIcon from "@/lib/icons/CircleSpinnerIcon";
import { ThemeVariant } from "@/types/theme";

type Props = {
  children: ReactNode;
  loading?: boolean;
  variant?: ThemeVariant;
} & ComponentProps<"button">;

const Button = ({ loading, variant = "neutral", className, children, disabled, ...props }: Props) => {
  return (
    <button
      className={clsx(`btn min-h-11 btn-${variant} `, className, {
        "btn-disabled": disabled,
        "text-white": variant === "error",
      })}
      disabled={loading || disabled}
      {...props}
    >
      {!loading ? children : <CircleSpinnerIcon className={`h-5 w-5 animate-spin text-${variant}-content`} />}
    </button>
  );
};

export default Button;
