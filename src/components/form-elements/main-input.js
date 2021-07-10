import { useEffect, useRef } from "react";
import styles from "./main-input.module.css";

export default function MainInput({
  dataTestId,
  inputStyle,
  invalidMessage,
  max,
  min,
  name,
  placeholder,
  setText,
  showInvalid,
  text,
  type,
}) {
  const ref = useRef(null);
  const invalidClass = invalidMessage && showInvalid ? styles["show-invalid"] : "";

  useEffect(() => {
    if (!ref.current || invalidMessage === undefined) return;

    ref.current.setCustomValidity(invalidMessage);
  });

  return (
    <input
      className={`${styles[inputStyle] || ""} ${invalidClass}`}
      data-testid={dataTestId}
      max={max}
      min={min}
      name={name}
      onChange={(event) => setText(event.currentTarget.value)}
      placeholder={placeholder}
      ref={ref}
      type={type}
      value={text}
    />
  );
}
