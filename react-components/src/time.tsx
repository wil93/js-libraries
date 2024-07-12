import { type ReactNode, useCallback, useEffect, useState } from "react";

import { differenceInMilliseconds, isPast } from "date-fns";

type Props = {
  start?: Date;
  end?: Date;
  children: ReactNode;
};

export function WithinTimeRange({ start, end, children }: Props) {
  const visible = useIsAfter(start) ?? true;
  const hidden = useIsAfter(end) ?? false;

  return visible && !hidden && children;
}

export function useIsAfter(time?: Date) {
  const isAfter = useCallback(() => time && isPast(time), [time]);

  const [value, setValue] = useState(isAfter);
  const refresh = useCallback(() => setValue(isAfter()), [isAfter]);

  useEffect(() => {
    if (!time) {
      setValue(undefined);
      return;
    }

    const diff = differenceInMilliseconds(time, Date.now());
    setValue(diff < 0);
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
