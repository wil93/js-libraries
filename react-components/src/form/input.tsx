import { useState } from "react";

import { LucideIcon } from "lucide-react";

import { BaseField, useField } from "./form";

type InputFieldProps<T> = {
  field: string;
  type?: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  icon?: LucideIcon;
  fromString: (value: string) => T;
  toString: (value: T) => string;
  validate?: (file: T) => string | undefined;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  optional?: boolean;
};

function InputField<T>({
  field,
  type,
  label,
  icon: Icon,
  fromString,
  toString,
  validate,
  disabled,
  optional,
  ...props
}: InputFieldProps<T>) {
  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const { value, setValue, validation, globalDisabled, pending } = useField(field, ref, validate);

  return (
    <BaseField label={label} validation={validation}>
      <div className="input input-bordered flex w-full items-center gap-4">
        {Icon && <Icon size={18} className="flex-none" />}
        <input
          ref={setRef}
          className="grow"
          type={type ?? "text"}
          name={field}
          {...props}
          value={toString(value)}
          onChange={(e) => setValue(fromString(e.target.value))}
          disabled={disabled || globalDisabled || pending}
          required={!optional}
        />
      </div>
    </BaseField>
  );
}

export type TextFieldProps = Omit<
  InputFieldProps<string>,
  "min" | "max" | "fromString" | "toString"
>;

export function TextField(props: TextFieldProps) {
  return (
    <InputField<string>
      {...props}
      maxLength={128}
      toString={(value) => value ?? ""}
      fromString={(value) => value}
    />
  );
}
