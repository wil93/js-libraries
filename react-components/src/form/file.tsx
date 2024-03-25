import { ChangeEvent, useState } from "react";

import { BaseField, useField } from "./form";

type SingleFileProps = {
  field: string;
  label: string;
  accept?: string;
  validate?: (file: File) => string | undefined;
  disabled?: boolean;
  optional?: boolean;
};

export function SingleFileField({
  field,
  label,
  accept,
  validate,
  disabled,
  optional,
}: SingleFileProps) {
  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const { setValue, validation, globalDisabled, pending } = useField(field, ref, validate);

  return (
    <BaseField label={label} validation={validation}>
      <input
        ref={setRef}
        type="file"
        className="file-input file-input-bordered w-full"
        onChange={(e) => setValue(e.target.files?.[0])}
        accept={accept}
        disabled={disabled || globalDisabled || pending}
        required={!optional}
      />
    </BaseField>
  );
}

type MultipleFilesProps = {
  field: string;
  label: string;
  accept?: string;
  validate?: (files: Record<string, File>) => string | undefined;
  disabled?: boolean;
  optional?: boolean;
};

export function MultipleFileField({
  field,
  label,
  accept,
  validate,
  disabled,
  optional,
}: MultipleFilesProps) {
  const [ref, setRef] = useState<HTMLInputElement | null>(null);
  const { setValue, validation, globalDisabled, pending } = useField(field, ref, validate);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
      ? Object.fromEntries(Array.from(e.target.files, (file) => [file.name, file]))
      : undefined;
    setValue(files);
  };

  return (
    <BaseField label={label} validation={validation}>
      <input
        ref={setRef}
        type="file"
        className="file-input file-input-bordered w-full"
        onChange={onChange}
        multiple={true}
        accept={accept}
        disabled={disabled || globalDisabled || pending}
        required={!optional}
      />
    </BaseField>
  );
}
