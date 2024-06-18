import {
  Dispatch,
  FormEvent,
  Fragment,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import clsx from "clsx";
import { CircleAlert } from "lucide-react";

import { FormFieldError } from "./error";

type FormContextProps = {
  state: Record<string, any>;
  setState: Dispatch<SetStateAction<Record<string, any>>>;
  globalDisabled: boolean;
  pending: boolean;
};

export const FormContext = createContext<FormContextProps>({
  state: {},
  setState: () => {},
  globalDisabled: false,
  pending: false,
});

type FormField<State> = ReactNode | ((state: Partial<State>) => ReactNode);

type FormProps<State> = {
  defaultValue?: Partial<State>;
  onSubmit: (value: State) => Promise<void> | void;
  disabled?: boolean;
  className?: string;
  children: FormField<State> | FormField<State>[];
};

export function Form<State extends Record<string, any>>({
  defaultValue,
  onSubmit,
  disabled,
  className,
  children,
}: FormProps<State>) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState(defaultValue ?? {});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current?.checkValidity()) return;
    setPending(true);

    try {
      await onSubmit?.(state as State);
    } catch (err) {
      if (err instanceof FormFieldError) {
        const input = formRef.current?.querySelector(`[name="${err.field}"]`) as HTMLInputElement;
        input?.setCustomValidity(err.message);
      } else {
        throw err;
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <FormContext.Provider
      value={{
        state,
        setState,
        globalDisabled: disabled ?? false,
        pending,
      }}>
      <form
        ref={formRef}
        className={clsx("mx-auto flex w-full max-w-sm flex-col items-center", className)}
        onSubmit={handleSubmit}>
        {(Array.isArray(children) ? children : [children]).map((child, i) =>
          typeof child === "function" ? <Fragment key={i}>{child(state)}</Fragment> : child,
        )}
      </form>
    </FormContext.Provider>
  );
}

export function useField<T>(
  field: string,
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null,
  options?: {
    validate?: (value: T) => string | undefined;
    validationErrorMap?: { [K in keyof ValidityState]?: string };
  },
) {
  const [validation, setValidation] = useState<string>();
  const { state, setState, globalDisabled, pending } = useContext(FormContext);

  useEffect(() => input?.setCustomValidity(validation ?? ""), [input, validation]);
  useEffect(() => {
    input?.addEventListener("invalid", onInvalid);
    return () => input?.removeEventListener("invalid", onInvalid);

    function onInvalid(e: Event) {
      const el = e.currentTarget as HTMLInputElement;
      for (const [validation, message] of Object.entries(options?.validationErrorMap ?? {})) {
        if (el.validity[validation as keyof ValidityState]) {
          setValidation(message);
          return;
        }
      }
      setValidation(el.validationMessage);
    }
  }, [input, options?.validationErrorMap]);

  return {
    value: state[field],
    setValue: (value: T | undefined) => {
      setState((state) => ({ ...state, [field]: value }));
      setValidation(value === undefined ? undefined : options?.validate?.(value));
    },
    validation,
    globalDisabled,
    pending,
  };
}

type BaseFieldProps = {
  label: string;
  validation?: string;
  children: ReactNode;
};

export function BaseField({ label, validation, children }: BaseFieldProps) {
  return (
    <label className="form-control mb-1 w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <div className={clsx(validation && "*:input-error")}>{children}</div>
      {validation && (
        <div className={clsx("m-1 flex items-center gap-1 text-sm", validation && "text-error")}>
          <CircleAlert size={14} className="flex-none" /> {validation}
        </div>
      )}
    </label>
  );
}
