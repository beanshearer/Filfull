import styles from "./main-label.module.css";

export default function MainLabel({ children, labelStyle, htmlFor, text }) {
  return (
    <div className={`${styles["main-label"]} ${styles[labelStyle] || ""}`}>
      <label htmlFor={htmlFor}>{text}</label>

      {children}
    </div>
  );
}
