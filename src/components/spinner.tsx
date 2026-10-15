export interface SpinnerProps { size?: number; className?: string; label?: string }

/** A small rotating arc. Inherits the current text colour. */
export function Spinner({ size = 18, className, label = "Loading" }: SpinnerProps) {
  return (
    <svg className={"sg-spinner" + (className ? " " + className : "")} width={size} height={size} viewBox="0 0 24 24" role="status" aria-label={label}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity=".2" strokeWidth="3" />
      <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
