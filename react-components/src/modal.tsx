import { type ReactNode, type Ref, forwardRef } from "react";

import clsx from "clsx";
import { X } from "lucide-react";

type ModalProps = {
  title: string;
  className?: string;
  children: ReactNode;
};

export const Modal = forwardRef(function Modal(
  { title, className, children }: ModalProps,
  ref: Ref<HTMLDialogElement>,
) {
  return (
    <dialog ref={ref} className="modal">
      <div className={clsx("modal-box", className)}>
        <form method="dialog">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            aria-label="Chiudi"
            type="submit">
            <X />
          </button>
        </form>
        <h1 className="mb-3 mt-0 text-lg font-bold">{title}</h1>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">Chiudi</button>
      </form>
    </dialog>
  );
});
