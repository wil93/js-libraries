import { ReactNode } from "react";

import clsx from "clsx";

type MenuProps = {
  fallback?: string;
  className?: string;
  children: ReactNode;
};

export function Menu({ fallback, className, children }: MenuProps) {
  return (
    <ul className={clsx("menu w-full rounded-box bg-base-200", className)}>
      {children}
      {fallback && <li className="col-span-full hidden p-2 text-center first:flex">{fallback}</li>}
    </ul>
  );
}
