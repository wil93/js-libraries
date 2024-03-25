import { ReactNode } from "react";

import clsx from "clsx";

type NavbarProps = {
  color: `bg-${string} text-${string}-content`;
  children: ReactNode;
};

export function Navbar({ color, children }: NavbarProps) {
  return (
    <div
      className={clsx(
        "sticky top-0 z-20 backdrop-blur [--tw-bg-opacity:0.85] print:hidden",
        color,
      )}>
      <div className="navbar mx-auto max-w-screen-xl justify-between px-4">{children}</div>
    </div>
  );
}

export function NavbarMenu({ children }: { children: ReactNode }) {
  return <ul className="menu menu-horizontal">{children}</ul>;
}
