import { Link, Redirect } from "react-router-dom";
import logo from "../../images/logo.jpg";
import styles from "./account-container.module.css";

export default function AccountContainer({ children, dataTestId, onSubmit, redirectHome }) {
  return (
    <div className={`${styles["account-container"]} ease-fade-in`} data-testid={dataTestId}>
      {redirectHome ? <Redirect to={{ pathname: "/" }} /> : undefined}

      <Link to={{ pathname: "/" }}>
        <img className={styles.logo} src={logo} alt="Logo" />
      </Link>

      <form className={styles["account-form"]} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}
