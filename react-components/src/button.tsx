import { ReactNode, useState } from "react";

import clsx from "clsx";
import { LucideIcon } from "lucide-react";

type Props = {
  onClick?: () => Promise<void>;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({ onClick, icon: Icon, disabled, className, children }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={clsx("btn", className)} onClick={handleClick} disabled={loading || disabled}>
      {loading ? <span className="loading loading-spinner" /> : Icon && <Icon size={22} />}
      {children}
    </button>
  );
}
