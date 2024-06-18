import { useEffect, useState } from "react";

import { BaseField, useField } from "./form";

type Props = {
  field: string;
  label: string;
  options: Record<string, string>;
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  disabled?: boolean;
  optional?: boolean;
};

export function SelectField({
  field,
  label,
  options,
  placeholder,
  validate,
  disabled,
  optional,
}: Props) {
  const [ref, setRef] = useState<HTMLSelectElement | null>(null);
  const { value, setValue, validation, globalDisabled, pending } = useField(field, ref, {
    validate,
  });

  useEffect(() => {
    if (value && !(value in options)) setValue(placeholder ? undefined : Object.keys(options)[0]);
  }, [value, setValue, options, placeholder]);

  return (
    <BaseField label={label} validation={validation}>
      <select
        ref={setRef}
        name={field}
        className="select select-bordered w-full"
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled || globalDisabled || pending}
        required={!optional}>
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {Object.entries(options).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </BaseField>
  );
}
