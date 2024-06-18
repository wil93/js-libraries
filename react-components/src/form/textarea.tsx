import { useState } from "react";

import { BaseField, useField } from "./form";

type Props = {
  field: string;
  label: string;
  rows?: number;
  placeholder?: string;
  validate?: (value: string) => string | undefined;
  disabled?: boolean;
  optional?: boolean;
};

export function TextAreaField({
  field,
  label,
  rows,
  placeholder,
  validate,
  disabled,
  optional,
}: Props) {
  const [ref, setRef] = useState<HTMLTextAreaElement | null>(null);
  const { value, setValue, validation, globalDisabled, pending } = useField(field, ref, {
    validate,
  });

  return (
    <BaseField label={label} validation={validation}>
      <textarea
        ref={setRef}
        name={field}
        className="textarea textarea-bordered w-full placeholder:italic placeholder:text-base-content/40"
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled || globalDisabled || pending}
        required={!optional}
        placeholder={placeholder}
        rows={rows}
      />
    </BaseField>
  );
}
