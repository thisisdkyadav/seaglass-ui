import { useCallback, useRef, useState } from "react";

/**
 * State that is either controlled (value + onChange) or uncontrolled (defaultValue),
 * the same contract every component in the library follows.
 */
export function useControllableState<T>(opts: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}): [T, (next: T | ((prev: T) => T)) => void] {
  const { value, defaultValue, onChange } = opts;
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? (value as T) : inner;
  const ref = useRef(current);
  ref.current = current;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const v = typeof next === "function" ? (next as (p: T) => T)(ref.current) : next;
      if (Object.is(v, ref.current)) return;
      if (!controlled) setInner(v);
      ref.current = v;
      onChangeRef.current?.(v);
    },
    [controlled],
  );
  return [current, set];
}
