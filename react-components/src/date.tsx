import clsx from "clsx";
import { intlFormat, intlFormatDistance } from "date-fns";

export function DateTime({ date, className }: { date: Date; className?: string }) {
  const formatted = intlFormat(date, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const duration = intlFormatDistance(date, new Date());

  return (
    <abbr title={duration} className={clsx(className)}>
      {formatted}
    </abbr>
  );
}

export function DateDistance({ date, className }: { date: Date; className?: string }) {
  const formatted = intlFormat(date, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const duration = intlFormatDistance(date, new Date());

  return (
    <abbr title={formatted} className={clsx(className)}>
      {duration}
    </abbr>
  );
}
