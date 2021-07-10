import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "./signup";

test("should render the signup panel", () => {
  render(
    <Router>
      <Signup />
    </Router>,
  );

  const panelElement = screen.getByTestId("signup-panel");

  expect(panelElement).toBeInTheDocument();
});
