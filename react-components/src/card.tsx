import type { ReactNode } from "react";

import clsx from "clsx";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={clsx("card overflow-hidden sm:card-side", className)}>{children}</div>;
}

export function CardBody({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      {children}
    </div>
  );
}

export function CardActions({ children }: { children: ReactNode }) {
  return <div className="card-actions mt-2 grow items-end justify-center">{children}</div>;
}
