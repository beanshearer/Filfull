import { render, screen } from "@testing-library/react";
import Home from "./home";
import { BrowserRouter as Router } from "react-router-dom";

test("should render the main header and main body sections", () => {
  render(
    <Router>
      <Home />
    </Router>,
  );

  const headerElement = screen.getByTestId("top-header");
  const bodyElement = screen.getByTestId("main-body");

  expect(headerElement).toBeInTheDocument();
  expect(bodyElement).toBeInTheDocument();
});
