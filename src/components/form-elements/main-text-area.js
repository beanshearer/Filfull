import { useEffect, useRef } from "react";
import styles from "./main-text-area.module.css";

export default function MainTextArea({
  invalidMessage,
  placeholder,
  setText,
  showInvalid,
  text,
  textAreaStyle,
}) {
  const ref = useRef(null);
  const invalidClass = invalidMessage && showInvalid ? styles["show-invalid"] : "";

  useEffect(() => {
    if (!ref.current || invalidMessage === undefined) return;

    ref.current.setCustomValidity(invalidMessage);
  });

  return (
    <textarea
      className={`${styles[textAreaStyle] || ""} ${invalidClass}`}
      onChange={(event) => setText(event.currentTarget.value)}
      placeholder={placeholder}
      ref={ref}
      value={text}
    />
  );
}
