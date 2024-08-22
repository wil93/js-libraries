import {
  type MouseEvent,
  type ReactNode,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

import clsx from "clsx";
import { Menu, X } from "lucide-react";

// @ts-ignore
import style from "./navbar.module.css";

type NavbarProps = {
  color: `bg-${string} text-${string}-content`;
  children: ReactNode;
};

export function Navbar({ color, children }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const onClick = useCallback((ev: MouseEvent<HTMLDivElement>) => {
    const el = ev.target;
    if (el instanceof HTMLAnchorElement || el instanceof HTMLButtonElement) {
      setOpen(false);
    }
  }, []);

  return (
    <div className={clsx(style.navbar, color)}>
      <div onClick={onClick}>
        <label
          className={clsx(style.navbarMenuIcon, "btn btn-ghost swap swap-rotate")}
          onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
            aria-label="Mostra menu"
          />
          <Menu className="swap-off" />
          <X className="swap-on" />
        </label>
        {children}
      </div>
    </div>
  );
}

export function NavbarBrand({ children }: { children: ReactNode }) {
  return <div className={style.navbarBrand}>{children}</div>;
}

export function NavbarMenu({ children }: { children: ReactNode }) {
  return (
    <div className={style.navbarMenu}>
      <div>
        <ul className="menu md:menu-horizontal">{children}</ul>
      </div>
    </div>
  );
}

export function NavbarSubmenu({ title, children }: { title: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const onClick = useCallback((ev: MouseEvent<HTMLUListElement>) => {
    const el = ev.target;
    if (el instanceof HTMLAnchorElement || el instanceof HTMLButtonElement) {
      setOpen(false);
      el.blur();
    }
  }, []);

  const [isScreenMd, setScreenMd] = useState<boolean>();
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)" /* screen(md) */);
    setScreenMd(mediaQuery.matches);

    mediaQuery.addEventListener("change", updateMedia);
    return () => mediaQuery.removeEventListener("change", updateMedia);

    function updateMedia(ev: MediaQueryListEvent) {
      setScreenMd(ev.matches);
    }
  }, []);

  const deferredIsMd = useDeferredValue(isScreenMd);

  return (
    <li className={clsx(style.navbarSubmenu, "md:dropdown")}>
      <div
        tabIndex={0}
        role="button"
        className={clsx("menu-dropdown-toggle", open && !isScreenMd && "menu-dropdown-show")}
        onClick={(e) => e.stopPropagation()}>
        <label>
          <div>{title}</div>
          <input
            type="checkbox"
            checked={open}
            onChange={(e) => setOpen(e.target.checked)}
            className={style.navbarSubmenuCheckbox}
          />
        </label>
      </div>
      <ul
        className={clsx("md:menu", isScreenMd && "dropdown-content", !deferredIsMd && "md:hidden")}
        onClick={onClick}>
        {children}
      </ul>
    </li>
  );
}

export function NavbarMenuItem({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}

export function NavbarContent({ children }: { children: ReactNode }) {
  return <div className={style.navbarContent}>{children}</div>;
}
