import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signin from "./signin";

test("should render the signin panel", () => {
  render(
    <Router>
      <Signin />
    </Router>,
  );

  const panelElement = screen.getByTestId("signin-panel");

  expect(panelElement).toBeInTheDocument();
});
