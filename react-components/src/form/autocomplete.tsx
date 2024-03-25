import { AtSign, KeyRound, UserRound } from "lucide-react";

import { TextField, TextFieldProps } from "./input";

export type TextAutocompleteFieldProps = Omit<
  TextFieldProps,
  "label" | "type" | "placeholder" | "autoComplete" | "icon"
> & { label?: string };

export function UsernameField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      label={props.label ?? "Username"}
      placeholder="Inserisci il tuo username"
      autoComplete="username"
      icon={UserRound}
    />
  );
}

export function EmailField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      type="email"
      label={props.label ?? "Email"}
      placeholder="Inserisci la tua email"
      autoComplete="email"
      icon={AtSign}
    />
  );
}

function PasswordField(
  props: Omit<TextFieldProps, "label" | "type" | "icon"> & { label?: string },
) {
  return <TextField {...props} label={props.label ?? "Password"} type="password" icon={KeyRound} />;
}

export function NewPasswordField(props: TextAutocompleteFieldProps) {
  return (
    <PasswordField
      {...props}
      placeholder="Crea una password"
      autoComplete="new-password"
      minLength={props.minLength ?? 8}
    />
  );
}

export function CurrentPasswordField(props: TextAutocompleteFieldProps) {
  return (
    <PasswordField
      {...props}
      placeholder="Inserisci la tua password"
      autoComplete="current-password"
    />
  );
}

export function FirstNameField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      label={props.label ?? "Nome"}
      placeholder="Inserisci il tuo nome"
      autoComplete="given-name"
    />
  );
}

export function LastNameField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      label={props.label ?? "Cognome"}
      placeholder="Inserisci il tuo cognome"
      autoComplete="family-name"
    />
  );
}
