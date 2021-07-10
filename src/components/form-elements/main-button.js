import styles from "./main-button.module.css";

export default function MainButton({ buttonStyle, dataTestId, disabled, onClick, title, type }) {
  return (
    <button
      className={`${styles["main-button"]} ${styles[buttonStyle] || ""}`}
      data-testid={dataTestId}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  );
}
