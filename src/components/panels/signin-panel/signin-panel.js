import { useContext, useState } from "react";
import AccountContainer from "../../containers/account-container";
import { ActivitiesContext } from "../../../contexts/activities-context";
import { Link } from "react-router-dom";
import MainButton from "../../form-elements/main-button";
import MainInput from "../../form-elements/main-input";
import MainLabel from "../../form-elements/main-label";
import { UserContext } from "../../../contexts/user-context";
import { auth } from "../../../firebase";
import isValidEmail from "../../../utility-functions/validators/is-valid-email";
import { isValidPassword } from "../../../utility-functions/validators/is-valid-password";
import { notify } from "react-notify-toast";
import styles from "./signin-panel.module.css";

export default function SigninPanel() {
  const { user } = useContext(UserContext);
  const { activitiesDispatch } = useContext(ActivitiesContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <AccountContainer
      redirectHome={user?.uid}
      onSubmit={async (event) => {
        event.preventDefault();

        setLoading(true);
        activitiesDispatch({ type: "removeAll" });

        try {
          const { user } = await auth.signInWithEmailAndPassword(email, password);

          notify.show(`Welcome back, ${user.displayName}`, "success");
        } catch (error) {
          setErrorMessage(error?.message);
        }

        setLoading(false);
      }}
      dataTestId="signin-panel"
    >
      <h3>Sign In</h3>

      <div>
        <MainLabel text="Email" htmlFor="email">
          <MainInput
            inputStyle="main-input"
            invalidMessage={isValidEmail(email, true)}
            placeholder="example@email.com"
            setText={setEmail}
            showInvalid={showInvalid}
            text={email}
            type="text"
            name="email"
          />
        </MainLabel>

        <MainLabel text="Password" htmlFor="password">
          <MainInput
            inputStyle="main-input"
            invalidMessage={isValidPassword(password)}
            placeholder="a-Strong_password-2021"
            setText={setPassword}
            showInvalid={showInvalid}
            text={password}
            type="password"
            name="password"
          />
        </MainLabel>
      </div>

      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : undefined}

      <MainButton
        buttonStyle="full-width-button"
        disabled={loading}
        onClick={() => setShowInvalid(true)}
        title="Sign In"
        type="submit"
      />

      <Link className={styles.link} to={{ pathname: "/signup" }}>
        Sign up for an account
      </Link>
    </AccountContainer>
  );
}
