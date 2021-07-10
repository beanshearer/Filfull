import { auth, db } from "../../../firebase";
import {
  doPasswordsMatch,
  isValidPassword,
} from "../../../utility-functions/validators/is-valid-password";
import { useContext, useState } from "react";
import AccountContainer from "../../containers/account-container";
import { ActivitiesContext } from "../../../contexts/activities-context";
import { ActivityTypesContext } from "../../../contexts/activity-types-context";
import { Link } from "react-router-dom";
import MainButton from "../../form-elements/main-button";
import MainInput from "../../form-elements/main-input";
import MainLabel from "../../form-elements/main-label";
import { UserContext } from "../../../contexts/user-context";
import isRequired from "../../../utility-functions/validators/is-required";
import isStrongPassword from "validator/lib/isStrongPassword";
import isValidEmail from "../../../utility-functions/validators/is-valid-email";
import { notify } from "react-notify-toast";
import styles from "./signup-panel.module.css";

export default function SignupPanel() {
  const { user } = useContext(UserContext);
  const { activityTypes } = useContext(ActivityTypesContext);
  const { allActivities } = useContext(ActivitiesContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showInvalid, setShowInvalid] = useState(false);

  return (
    <AccountContainer
      redirectHome={user?.uid}
      onSubmit={async (event) => {
        event.preventDefault();

        try {
          const response = await auth.createUserWithEmailAndPassword(email, password);

          await response?.user?.updateProfile?.({ displayName: name });

          const batch = db.batch();

          activityTypes.forEach((activityType) => {
            const activityTypeCollection = db
              .collection(`users/${response?.user?.uid}/activityTypes`)
              .doc(activityType.uid);

            batch.set(activityTypeCollection, activityType);
          });

          Object.values(allActivities).forEach((activities) => {
            activities.forEach((activity) => {
              const activityTypeCollection = db
                .collection(`users/${response?.user?.uid}/activities`)
                .doc(activity.uid);

              batch.set(activityTypeCollection, activity);
            });
          });

          await batch.commit();

          notify.show(`Thanks for signing up ${name}`, "success");
        } catch (error) {
          setErrorMessage(error?.message);
        }
      }}
      dataTestId="signup-panel"
    >
      <h3>Sign up for your account</h3>

      <div>
        <MainLabel text="Name" htmlFor="name">
          <MainInput
            inputStyle="main-input"
            invalidMessage={isRequired("Name", name)}
            name="name"
            placeholder="e.g. John Smith"
            setText={setName}
            dataTestId="name-input"
            showInvalid={showInvalid}
            text={name}
            type="text"
          />
        </MainLabel>

        <MainLabel text="Email" htmlFor="email">
          <MainInput
            dataTestId="email-input"
            inputStyle="main-input"
            invalidMessage={isValidEmail(email, true)}
            name="email"
            placeholder="e.g. example@email.com"
            setText={setEmail}
            showInvalid={showInvalid}
            text={email}
            type="text"
          />
        </MainLabel>

        <MainLabel text="Password" htmlFor="password">
          <MainInput
            dataTestId="password-input"
            inputStyle="main-input"
            invalidMessage={isValidPassword(password)}
            placeholder="e.g. a-Strong_password-2021"
            setText={setPassword}
            showInvalid={showInvalid}
            text={password}
            type="password"
            name="password"
          />

          <svg className={styles["password-strength"]}>
            <rect width={`${isStrongPassword(password, { returnScore: true }) * 2.5}%`} />
          </svg>
        </MainLabel>

        <MainLabel text="Confirm Password" htmlFor="confirm-password">
          <MainInput
            dataTestId="confirm-password-input"
            inputStyle="main-input"
            invalidMessage={doPasswordsMatch(password, confirmPassword)}
            name="confirm-password"
            placeholder="e.g. a-Strong_password-2021"
            setText={setConfirmPassword}
            showInvalid={showInvalid}
            text={confirmPassword}
            type="password"
          />
        </MainLabel>
      </div>

      {errorMessage ? <div className={styles.error}>{errorMessage}</div> : undefined}

      <MainButton
        buttonStyle="signup-button"
        dataTestId="signup-button"
        onClick={() => setShowInvalid(true)}
        title="Create Account"
        type="submit"
      />

      <Link className={styles.link} to={{ pathname: "/signin" }}>
        Already have an account? Sign in
      </Link>
    </AccountContainer>
  );
}
