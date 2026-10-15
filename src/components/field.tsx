import { createContext, forwardRef, useContext, useId, type HTMLAttributes, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from "react";
import { Label as L } from "radix-ui";
import { cx } from "../lib/cx";

/* ============================================================
   Field wires a label, a control, help text and an error message
   together (ids, aria-describedby, aria-invalid) so the control
   inside never needs to be told.
   ============================================================ */
interface FieldCtx { id: string; descriptionId?: string; errorId?: string; invalid: boolean; disabled?: boolean; required?: boolean }
const FieldContext = createContext<FieldCtx | null>(null);
export const useField = () => useContext(FieldContext);

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label?: ReactNode;
  description?: ReactNode;
  /** Error message. Its presence marks the control invalid. */
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Put the label beside the control (for checkboxes and switches). */
  orientation?: "vertical" | "horizontal";
  /** Override the generated control id. */
  id?: string;
  children: ReactNode;
}

export function Field({ label, description, error, required, disabled, orientation = "vertical", id, className, children, ...rest }: FieldProps) {
  const auto = useId();
  const controlId = id ?? `sg-field-${auto}`;
  const ctx: FieldCtx = {
    id: controlId,
    descriptionId: description ? controlId + "-desc" : undefined,
    errorId: error ? controlId + "-err" : undefined,
    invalid: !!error, disabled, required,
  };
  return (
    <FieldContext.Provider value={ctx}>
      <div className={cx("sg-field", className)} data-orientation={orientation} data-invalid={error ? "" : undefined} data-disabled={disabled ? "" : undefined} {...rest}>
        {label != null && (
          <Label htmlFor={controlId} className="sg-field-label">
            {label}{required && <span className="sg-field-required" aria-hidden> *</span>}
          </Label>
        )}
        <div className="sg-field-control">{children}</div>
        {description && <p id={ctx.descriptionId} className="sg-field-description">{description}</p>}
        {error && <p id={ctx.errorId} className="sg-field-error" role="alert">{error}</p>}
      </div>
    </FieldContext.Provider>
  );
}

export const Label = forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<typeof L.Root>>(function Label({ className, ...rest }, ref) {
  return <L.Root ref={ref} className={cx("sg-label", className)} {...rest} />;
});

/** Props every control spreads so a surrounding Field can label and describe it. */
export function useFieldControlProps(props: { id?: string; disabled?: boolean; required?: boolean; "aria-invalid"?: React.AriaAttributes["aria-invalid"]; "aria-describedby"?: string }) {
  const f = useField();
  const describedBy = [props["aria-describedby"], f?.descriptionId, f?.errorId].filter(Boolean).join(" ") || undefined;
  return {
    id: props.id ?? f?.id,
    disabled: props.disabled ?? f?.disabled,
    required: props.required ?? f?.required,
    "aria-invalid": props["aria-invalid"] ?? (f?.invalid || undefined),
    "aria-describedby": describedBy,
  };
}

/* ---------- Input ---------- */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  /** Icon or text inside the field, before the value. */
  leading?: ReactNode;
  /** Icon, button or text inside the field, after the value. */
  trailing?: ReactNode;
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", leading, trailing, invalid, className, style, ...rest }, ref,
) {
  const control = useFieldControlProps({ ...rest, "aria-invalid": invalid || rest["aria-invalid"] });
  return (
    <div className={cx("sg-input sg-well", className)} style={style} data-size={size} data-invalid={control["aria-invalid"] ? "" : undefined} data-disabled={control.disabled ? "" : undefined}>
      {leading && <span className="sg-input-adorn" aria-hidden={typeof leading !== "object" ? undefined : true}>{leading}</span>}
      <input ref={ref} className="sg-input-el" {...rest} {...control} />
      {trailing && <span className="sg-input-adorn sg-input-trailing">{trailing}</span>}
    </div>
  );
});

/* ---------- Textarea ---------- */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  /** Grow with the content up to maxRows. */
  autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ invalid, autoResize, className, onInput, ...rest }, ref) {
  const control = useFieldControlProps({ ...rest, "aria-invalid": invalid || rest["aria-invalid"] });
  return (
    <textarea
      ref={ref}
      className={cx("sg-textarea sg-well", className)}
      data-invalid={control["aria-invalid"] ? "" : undefined}
      onInput={(e) => {
        if (autoResize) { const t = e.currentTarget; t.style.height = "auto"; t.style.height = t.scrollHeight + "px"; }
        onInput?.(e);
      }}
      {...rest}
      {...control}
    />
  );
});
