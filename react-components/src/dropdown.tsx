import type { ReactNode } from "react";

import clsx from "clsx";

type Props = {
  className?: string;
  children?: ReactNode;
};

export function Dropdown({ className, children }: Props) {
  return <div className={clsx("dropdown max-w-full flex-none", className)}>{children}</div>;
}

export function DropdownButton({ className, children, ariaLabel }: Props & { ariaLabel?: string }) {
  return (
    <div
      tabIndex={0}
      role="button"
      className={clsx("btn btn-ghost no-animation w-full flex-nowrap", className)}
      aria-label={ariaLabel}>
      {children}
    </div>
  );
}

export function DropdownMenu({ className, children }: Props) {
  return <ul className={clsx("menu dropdown-content !transition-all", className)}>{children}</ul>;
}
