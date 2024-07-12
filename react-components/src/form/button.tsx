import { type ReactNode, useContext } from "react";

import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

import { FormContext } from "./form";

type SubmitButtonProps = {
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
  children: ReactNode;
};

export function SubmitButton({ disabled, icon: Icon, className, children }: SubmitButtonProps) {
  const { globalDisabled, pending } = useContext(FormContext);

  return (
    <button
      className={clsx("btn btn-primary mt-4", className)}
      type="submit"
      disabled={disabled || globalDisabled || pending}>
      {pending ? <span className="loading loading-spinner" /> : Icon && <Icon size={22} />}
      {children}
    </button>
  );
}

type FormButtonProps = {
  disabled?: boolean;
  icon?: LucideIcon;
  onClick: () => void;
  className?: string;
  children: ReactNode;
};

export function FormButton({
  disabled,
  icon: Icon,
  onClick,
  className,
  children,
}: FormButtonProps) {
  const { globalDisabled, pending } = useContext(FormContext);

  return (
    <button
      className={clsx("btn btn-primary mt-4", className)}
      type="button"
      onClick={onClick}
      disabled={disabled || globalDisabled || pending}>
      {Icon && <Icon size={22} />}
      {children}
    </button>
  );
}
