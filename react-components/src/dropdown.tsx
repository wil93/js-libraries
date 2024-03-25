import { ReactNode } from "react";

import clsx from "clsx";

type Props = {
  className?: string;
  children?: ReactNode;
};

export function Dropdown({ className, children }: Props) {
  return <div className={clsx("dropdown max-w-full flex-none", className)}>{children}</div>;
}

export function DropdownButton({ children }: { children: ReactNode }) {
  return (
    <div tabIndex={0} role="button" className="btn btn-ghost no-animation w-full flex-nowrap">
      {children}
    </div>
  );
}

export function DropdownMenu({ children }: { children: ReactNode }) {
  return <ul className="menu dropdown-content">{children}</ul>;
}
