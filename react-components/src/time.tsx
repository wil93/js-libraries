import { ReactNode, useCallback, useEffect, useState } from "react";

import { differenceInMilliseconds, isPast } from "date-fns";

type Props = {
  start?: Date;
  end?: Date;
  children: ReactNode;
};

export function WithinTimeRange({ start, end, children }: Props) {
  const visible = useIsAfter(start) ?? true;
  const hidden = useIsAfter(end) ?? false;

  if (visible && !hidden) return children;
}

export function useIsAfter(time?: Date) {
  const isAfter = useCallback(() => time && isPast(time), [time]);

  const [value, setValue] = useState(isAfter);
  const refresh = useCallback(() => !value && isAfter() && setValue(true), [value, isAfter]);

  useEffect(() => {
    if (!time) {
      setValue(undefined);
      return;
    }

    const diff = differenceInMilliseconds(time, Date.now());
    if (diff < 0) return;

    const timeout = setTimeout(refresh, diff + 5);
    return () => clearTimeout(timeout);
  }, [time, refresh]);

  useEffect(() => {
    window.addEventListener("visibilitychange", refresh);
    return () => window.removeEventListener("visibilitychange", refresh);
  }, [refresh]);

  return value;
}
