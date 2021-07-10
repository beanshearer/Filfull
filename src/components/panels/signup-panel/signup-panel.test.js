import { auth, db } from "../../../firebase";
import { fireEvent, render, screen } from "@testing-library/react";
import { ActivitiesContext } from "../../../contexts/activities-context";
import { BrowserRouter as Router } from "react-router-dom";
import SignupPanel from "./signup-panel";
import { notify } from "react-notify-toast";

test("sign up sends the correct values to firebase auth", () => {
  db.batch = jest.fn(() => ({ commit: () => {} }));
  notify.show = jest.fn();
  auth.createUserWithEmailAndPassword = jest.fn(() => ({ user: { updateProfile: () => {} } }));

  render(
    <Router>
      <ActivitiesContext.Provider value={{ allActivities: [] }}>
        <SignupPanel />
      </ActivitiesContext.Provider>
    </Router>,
  );

  const nameInput = screen.getByTestId("name-input");
  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");
  const confirmPasswordInput = screen.getByTestId("confirm-password-input");
  const signupButtonInput = screen.getByTestId("signup-button");

  fireEvent.change(nameInput, { target: { value: "Name" } });
  fireEvent.change(emailInput, { target: { value: "test@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "Password123!" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "Password123!" } });
  fireEvent.click(signupButtonInput);

  expect(nameInput).toHaveValue("Name");
  expect(emailInput).toHaveValue("test@email.com");
  expect(passwordInput).toHaveValue("Password123!");
  expect(confirmPasswordInput).toHaveValue("Password123!");

  expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
    "test@email.com",
    "Password123!",
  );
});
