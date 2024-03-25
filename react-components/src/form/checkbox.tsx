import { useState } from "react";

import { useField } from "./form";

type Props = {
  field: string;
  label: string;
  disabled?: boolean;
  optional?: boolean;
};

export function CheckboxField({ field, label, disabled, optional }: Props) {
  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const { value, setValue, globalDisabled, pending } = useField(field, ref);

  return (
    <div className="form-control w-full">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          ref={setRef}
          className="checkbox"
          type="checkbox"
          name={field}
          checked={value ?? false}
          onChange={(e) => setValue(e.target.checked)}
          disabled={disabled || globalDisabled || pending}
          required={!optional}
        />
      </label>
    </div>
  );
}
