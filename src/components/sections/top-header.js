import { AccountSidebarOpenContext } from "../../contexts/account-sidebar-open-context";
import { Link } from "react-router-dom";
import MainButton from "../form-elements/main-button";
import { UserContext } from "../../contexts/user-context";
import logo from "../../images/logo.jpg";
import styles from "./top-header.module.css";
import { useContext } from "react";

export default function TopHeader() {
  const { setAccountSidebarOpen } = useContext(AccountSidebarOpenContext);
  const { user } = useContext(UserContext);

  return (
    <header className={`${styles["top-header"]} ease-fade-in`} data-testid="top-header">
      <img className={styles.logo} src={logo} alt="Logo" />

      <nav>
        {user?.uid ? (
          <MainButton
            buttonStyle="link"
            onClick={() => setAccountSidebarOpen(true)}
            title="Account"
          />
        ) : undefined}
        {user?.uid ? undefined : (
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>

            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
