import { useState } from "react";

import { formatISO } from "date-fns";
import { LucideIcon } from "lucide-react";

import { BaseField, useField } from "./form";

type InputFieldProps<T> = {
  field: string;
  type?: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  icon?: LucideIcon;
  fromString: (value: string) => T;
  toString: (value: T) => string;
  validate?: (file: T) => string | undefined;
  refine?: (value: T) => T;

  minLength?: number;
  maxLength?: number;
  min?: T;
  max?: T;
  pattern?: string;
  disabled?: boolean;
  optional?: boolean;
  validationErrorMap?: { [K in keyof ValidityState]?: string };
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
  min,
  max,
  validationErrorMap,
  autoComplete,
  ...props
}: InputFieldProps<T>) {
  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const { value, setValue, validation, globalDisabled, pending } = useField(field, ref, {
    validate,
    validationErrorMap,
  });

  return (
    <BaseField label={label} validation={validation}>
      <div className="input input-bordered flex w-full items-center gap-4">
        {Icon && <Icon size={18} className="flex-none" />}
        <input
          ref={setRef}
          className="w-full placeholder:italic placeholder:text-base-content/40"
          type={type ?? "text"}
          name={field}
          value={value === undefined ? "" : toString(value)}
          onChange={(e) => setValue(e.target.value === "" ? undefined : fromString(e.target.value))}
          min={min === undefined ? undefined : toString(min)}
          max={max === undefined ? undefined : toString(max)}
          disabled={disabled || globalDisabled || pending}
          required={!optional}
          autoComplete={autoComplete ?? "off"}
          {...props}
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
      fromString={(value) => value}
      toString={(value) => value}
    />
  );
}

export type NumberFieldProps = Omit<InputFieldProps<number>, "pattern" | "fromString" | "toString">;

export function NumberField(props: NumberFieldProps) {
  return <InputField<number> {...props} type="number" fromString={Number} toString={String} />;
}

export type DateFieldProps = Omit<InputFieldProps<Date>, "pattern" | "fromString" | "toString">;

export function DateField(props: DateFieldProps) {
  return (
    <InputField<Date>
      {...props}
      type="date"
      fromString={(value) => new Date(value)}
      toString={(value) => formatISO(value, { representation: "date" })}
    />
  );
}
